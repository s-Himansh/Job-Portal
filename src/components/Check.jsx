import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Check() {
  const [editableData, setEditableData] = useState({
    jobProfile: 'Software Engineer',
    companyName: 'Tech Solutions Inc.',
    location: 'New York, NY',
    duration: 'Full-time',
    startDate: '2024-05-12',
    stipend: '$80,000 / month',
    aboutTheJob: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla efficitur mi, nec facilisis risus vestibulum in.',
    keyResponsibilities: [
      'Develop new features for web applications',
      'Collaborate with team members on projects',
      'Debug and troubleshoot issues',
      'Write clean, maintainable code'
    ],
    skillsRequired: [
      'Proficient in JavaScript and React.js',
      'Experience with RESTful APIs',
      'Strong problem-solving skills',
      'Ability to work in a team environment'
    ],
    whoCanApply: 'Candidates with a Bachelor\'s degree in Computer Science or equivalent experience.',
    salary: '80,000$ / year',
    perks: 'Health insurance, retirement plan, flexible working hours',
    vacancies: '5',
    aboutCompany: 'Tech Solutions Inc. is a leading technology company specializing in web development and software solutions.'
  });

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditableData({ ...editableData, [field]: value });
  };

  return (

    <>
      <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
        <Link to='/'>
          Back
        </Link>
      </div>
      <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 to-green-100">
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg mt-10 mb-10 border border-gray-300">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-semibold mb-6">
              <input
                type="text"
                value={editableData.jobProfile}
                onChange={(e) => handleChange(e, 'jobProfile')}
                className='italic justify-center text-center p-2 rounded-md'
              />
            </h1>
            <div className=''>
              <p className="text-lg text-gray-600 mb-2">
                <input
                  type="text"
                  value={editableData.companyName}
                  onChange={(e) => handleChange(e, 'companyName')}
                  className='justify-center text-center p-2 rounded-md'
                />
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <input
                  type="text"
                  value={editableData.location}
                  onChange={(e) => handleChange(e, 'location')}
                  className='justify-center text-center p-2 rounded-md'
                />
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <input
                  type="text"
                  value={editableData.duration}
                  onChange={(e) => handleChange(e, 'duration')}
                  className='justify-center text-center p-2 rounded-md'
                />
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <input
                  type="date"
                  value={editableData.startDate}
                  onChange={(e) => handleChange(e, 'startDate')}
                  className='justify-center text-center p-2 rounded-md'
                />
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <input
                  type="text"
                  value={editableData.stipend}
                  onChange={(e) => handleChange(e, 'stipend')}
                  className='justify-center text-center p-2 rounded-md'
                />
              </p>
            </div>
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Job:</h2>
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 "
              value={editableData.aboutTheJob}
              onChange={(e) => handleChange(e, 'aboutTheJob')}
            />
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">Key Responsibilities:</h2>
            <ul className="list-disc list-inside">
              {editableData.keyResponsibilities.map((responsibility, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => {
                      const updatedKeyResponsibilities = [...editableData.keyResponsibilities];
                      updatedKeyResponsibilities[index] = e.target.value;
                      handleChange({ target: { value: updatedKeyResponsibilities } }, 'keyResponsibilities');
                    }}
                    className='w-1/2 p-2 rounded-md'
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">Skills Required:</h2>
            <ul className="list-disc list-inside">
              {editableData.skillsRequired.map((skill, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const updatedSkillsRequired = [...editableData.skillsRequired];
                      updatedSkillsRequired[index] = e.target.value;
                      handleChange({ target: { value: updatedSkillsRequired } }, 'skillsRequired');
                    }}
                    className='w-1/2 p-2 rounded-md'
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">Who Can Apply:</h2>
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 "
              value={editableData.whoCanApply}
              onChange={(e) => handleChange(e, 'whoCanApply')}
            />
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">Salary:</h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full "
              value={editableData.salary}
              onChange={(e) => handleChange(e, 'salary')}
            />
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">Perks:</h2>
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 w-full h-24"
              value={editableData.perks}
              onChange={(e) => handleChange(e, 'perks')}
            />
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">Vacancies:</h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={editableData.vacancies}
              onChange={(e) => handleChange(e, 'vacancies')}
            />
          </div>

          <div className="border-b-2 border-gray-300 mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Company:</h2>
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 w-full h-24"
              value={editableData.aboutCompany}
              onChange={(e) => handleChange(e, 'aboutCompany')}
            />
          </div>

          <div className="text-center mt-6">
            <button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Check;
