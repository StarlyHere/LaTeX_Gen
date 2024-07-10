import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      name,
      email,
      phone,
      education,
      experience1,
      experience1_highlights,
      experience2,
      experience2_highlights,
      experience3,
      experience3_highlights,
      skills,
      githubLink,
      linkedinLink,
      personalWebsite,
      projectTitle,
      projectDescription,
      projectChoice,
      projectGithub,
      projectLink,
    } = req.body;

    // Generate LaTeX content
    const latexContent = `
\\documentclass{article}
\\usepackage{graphicx} % For scaling text
\\usepackage{array} % For table alignment
\\usepackage{ragged2e} % For right alignment
\\begin{document}
\\begin{center}
\\scalebox{2.0}{\\textbf{${name}}} % Scale name to twice its size
\\end{center}

\\section*{Contact Information}
\\vspace*{-1em}
\\noindent\\hrulefill % Horizontal line
\\newline
\\begin{tabular}{@{}ll}
\\textbf{Email:} & ${email} \\\\
\\textbf{Phone:} & ${phone} \\\\
${githubLink ? `\\textbf{GitHub:} & ${githubLink} \\\\` : ""}
${linkedinLink ? `\\textbf{LinkedIn:} & ${linkedinLink} \\\\` : ""}
${personalWebsite ? `\\textbf{Personal Website:} & ${personalWebsite} \\\\` : ""}
\\end{tabular}

\\section*{Education}
\\vspace*{-1em}
\\noindent\\hrulefill % Horizontal line
\\newline
${education}

\\section*{Experience}
\\vspace*{-1em}
\\noindent\\hrulefill % Horizontal line
\\newline
\\textbf{${experience1}}
\\newline
${experience1_highlights}
\\vspace{1em} % Add vertical space between experiences
\\newline
\\textbf{${experience2}}
\\newline
${experience2_highlights}
\\vspace{1em} % Add vertical space between experiences
\\newline
\\textbf{${experience3}}
\\newline
${experience3_highlights}

\\section*{Project Details}
\\vspace*{-1em}
\\noindent\\hrulefill % Horizontal line
\\newline
\\begin{tabular}{@{}>{\\raggedright\\arraybackslash}p{0.5\\textwidth} >{\\raggedleft\\arraybackslash}p{0.5\\textwidth}@{}}
\\textbf{${projectTitle}} & ${projectChoice === "file" ? `{${projectGithub}}` : `\\textbf{Deployed Project Link:} ${projectLink}`} \\\\
\\end{tabular}
\\newline
${projectDescription}

\\section*{Skills}
\\vspace*{-1em}
\\noindent\\hrulefill % Horizontal line
\\newline
${skills}

\\end{document}
`;

    // Save LaTeX content to a .tex file
    const latexFilePath = path.join(process.cwd(), "public", "resume.tex");
    fs.writeFileSync(latexFilePath, latexContent);

    // Convert LaTeX to PDF using pdflatex (synchronous execution)
    try {
      execSync(
        `pdflatex -output-directory=${path.dirname(
          latexFilePath
        )} ${latexFilePath}`
      );
    } catch (error) {
      console.error(`Error generating PDF: ${error}`);
      return res.status(500).json({ error: "Error generating PDF" });
    }

    // Assuming pdflatex generates 'resume.pdf' in the same directory
    const pdfFilePath = path.join(process.cwd(), "public", "resume.pdf");
    const pdfFileUrl = `/resume.pdf`; // Adjust URL as per your deployment configuration

    res.status(200).json({ pdfFilePath: pdfFileUrl });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
