import React from 'react';

function Resume() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Your Name</h1>
      <p className="text-lg mb-4">Your Profession/Title</p>

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <ul>
          <li>Email: your.email@example.com</li>
          <li>Phone: (123) 456-7890</li>
          <li>Address: 123 Street, City, Country</li>
          {/* Add more contact information if needed */}
        </ul>
      </section>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>
          Brief summary of your professional background, skills, and career objectives.
        </p>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <ul>
          <li>
            <p className="font-semibold">Degree Name</p>
            <p>School/Institution Name</p>
            <p>Graduation Year</p>
            {/* Add more education entries if applicable */}
          </li>
        </ul>
      </section>

      {/* Work Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <ul>
          <li>
            <p className="font-semibold">Job Title</p>
            <p>Company Name</p>
            <p>Start Date - End Date</p>
            <ul>
              <li>Responsibility 1</li>
              <li>Responsibility 2</li>
              {/* Add more responsibilities if applicable */}
            </ul>
          </li>
          {/* Add more work experience entries if applicable */}
        </ul>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul>
          <li>Skill 1</li>
          <li>Skill 2</li>
          {/* Add more skills if applicable */}
        </ul>
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
        <ul>
          <li>Certification Name</li>
          <li>Certifying Authority</li>
          <li>Issuance Date</li>
          {/* Add more certifications if applicable */}
        </ul>
      </section>

      {/* Languages */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Languages</h2>
        <ul>
          <li>Language 1: Proficiency Level</li>
          <li>Language 2: Proficiency Level</li>
          {/* Add more languages if applicable */}
        </ul>
      </section>

      {/* References */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">References</h2>
        <ul>
          <li>Reference 1: Contact Information</li>
          <li>Reference 2: Contact Information</li>
          {/* Add more references if applicable */}
        </ul>
      </section>
    </div>
  );
}

export default Resume;
