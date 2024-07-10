import React, { useState } from 'react';

export default function FormGen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience1: '',
    experience1_highlights: '',
    experience2: '',
    experience2_highlights: '',
    experience3: '',
    experience3_highlights: '',
    skills: '',
    githubLink: '',
    linkedinLink: '',
    personalWebsite: '',
    projectTitle: '',
    projectDescription: '',
    projectChoice: 'file', // Default choice is 'file'
    projectFile: null, // Remove this line if no longer needed
    projectGithub: '', // Use an empty string for the link
    projectLink: '' // Use an empty string for the link
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/generate-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    
    // Open PDF in a new tab
    window.open(result.pdfFilePath, '_blank');
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-6xl flex text-[#87A922] justify-center font-bold mb-5 font-pixelify-sans">Resume Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-medium">
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Education */}
        <div>
          <label className="block mb-2 font-medium">
            Education:
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Experience 1 */}
        <div>
          <label className="block mb-2 font-medium">
            Experience 1 (Company Name):
            <textarea
              name="experience1"
              placeholder='Enter company name'
              value={formData.experience1}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block mt-4 mb-2 font-medium">
            Experience 1 Highlights:
            <textarea
              name="experience1_highlights"
              placeholder='Work experience highlights'
              value={formData.experience1_highlights}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Experience 2 */}
        <div>
          <label className="block mb-2 font-medium">
            Experience 2 (Company Name):
            <textarea
              name="experience2"
              placeholder='Enter company name'
              value={formData.experience2}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block mt-4 mb-2 font-medium">
            Experience 2 Highlights:
            <textarea
              name="experience2_highlights"
              placeholder='Work experience highlights'
              value={formData.experience2_highlights}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Experience 3 */}
        <div>
          <label className="block mb-2 font-medium">
            Experience 3 (Company Name):
            <textarea
              name="experience3"
              placeholder='Enter company name'
              value={formData.experience3}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block mt-4 mb-2 font-medium">
            Experience 3 Highlights:
            <textarea
              name="experience3_highlights"
              placeholder='Work experience highlights'
              value={formData.experience3_highlights}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Project Title and Choice */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Project Title:
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <div className="flex items-center space-x-4">
            <label className="block mb-2 font-medium flex-1">
              Project Choice:
              <select
                name="projectChoice"
                value={formData.projectChoice}
                onChange={handleChange}
                className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="file">Provide Github Link</option>
                <option value="link">Provide Deployed Project Link</option>
              </select>
            </label>
            {formData.projectChoice === 'file' && (
              <label className="block mb-2 font-medium flex-1">
                Github Link:
                <input
                  type="text"
                  name="projectGithub"
                  value={formData.projectGithub}
                  onChange={handleChange}
                  className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
            )}
            {formData.projectChoice === 'link' && (
              <label className="block mb-2 font-medium flex-1">
                Deployed Project Link:
                <input
                  type="text"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleChange}
                  className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
            )}
          </div>

          {/* Project Description */}
          <label className="block mb-2 font-medium">
            Project Description:
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 font-medium">
            Skills:
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* GitHub Link */}
        <div>
          <label className="block mb-2 font-medium">
            GitHub Link:
            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* LinkedIn Link */}
        <div>
          <label className="block mb-2 font-medium">
            LinkedIn Link:
            <input
              type="text"
              name="linkedinLink"
              value={formData.linkedinLink}
              onChange={handleChange}
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Personal Website */}
        <div>
          <label className="block mb-2 font-medium">
            Personal Website:
            <input
              type="text"
              name="personalWebsite"
              value={formData.personalWebsite}
              onChange={handleChange}
              className="mt-1 text-xl bg-black text-[#06D001] font-vt323 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-[#87A922] text-white py-2 px-4 rounded-md">
          Generate Resume
        </button>
      </form>
    </div>
  );
}
