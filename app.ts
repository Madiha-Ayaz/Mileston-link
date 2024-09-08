interface Resume {
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  skills: string;
  experience: string;
}

// Generate a UUID
const generateUUID = (): string => {
  return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const updateResume = (resume: Resume): void => {
  const resumeOutput = document.getElementById('resumeOutput');
  if (resumeOutput) {
    resumeOutput.innerHTML = `
      <h2>${resume.name}</h2>
      <p>Email: ${resume.email}</p>
      <p>Phone: ${resume.phone}</p>
      <p>Location: ${resume.location}</p>
      <h3>Education</h3>
      <p>${resume.education}</p>
      <h3>Skills</h3>
      <p>${resume.skills}</p>
      <h3>Experience</h3>
      <p>${resume.experience}</p>
    `;
  } else {
    console.error('Resume Output element not found');
  }
};

const generateUniqueURL = (id: string): string => {
  return `${window.location.origin}?resumeId=${id}`;
};

const handleFormSubmit = (event: Event): void => {
  event.preventDefault();

  const nameElement = document.getElementById("name") as HTMLInputElement;
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const phoneElement = document.getElementById("phone") as HTMLInputElement;
  const locationElement = document.getElementById("location") as HTMLInputElement;
  const educationElement = document.getElementById("education") as HTMLTextAreaElement;
  const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;
  const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;

  if (nameElement && emailElement && phoneElement && locationElement && educationElement && skillsElement && experienceElement) {
    const resumeData: Resume = {
      name: nameElement.value,
      email: emailElement.value,
      phone: phoneElement.value,
      location: locationElement.value,
      education: educationElement.value,
      skills: skillsElement.value,
      experience: experienceElement.value,
    };

    const resumeId = generateUUID();
    localStorage.setItem(resumeId, JSON.stringify(resumeData));

    updateResume(resumeData);

    const shareLink = generateUniqueURL(resumeId);
    const shareLinkElement = document.getElementById('shareLink');
    if (shareLinkElement) {
      shareLinkElement.innerHTML = `<p>Share your resume using this link:</p><a href="${shareLink}" target="_blank">${shareLink}</a>`;
    }
  } else {
    console.error('One or more form elements are missing');
  }
};

const loadResumeFromURL = (): void => {
  const urlParams = new URLSearchParams(window.location.search);
  const resumeId = urlParams.get('resumeId');
  if (resumeId) {
    const resumeData = localStorage.getItem(resumeId);
    if (resumeData) {
      updateResume(JSON.parse(resumeData));
    } else {
      console.error('Resume data not found');
    }
  }
};

document.getElementById("resume-form")?.addEventListener("submit", handleFormSubmit);
window.addEventListener('load', loadResumeFromURL);

const handleResize = (): void => {
  const mobileView = window.matchMedia("(max-width: 600px)");

  if (mobileView.matches) {
    console.log("Switching to mobile view");
    document.body.style.fontSize = "14px";
  } else {
    console.log("Switching to desktop view");
    document.body.style.fontSize = "16px";
  }
};

window.addEventListener("resize", handleResize);
handleResize();



 