var _a;
// Generate a UUID
var generateUUID = function () {
    return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var updateResume = function (resume) {
    var resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = "\n          <h2>".concat(resume.name, "</h2>\n          <p>Email: ").concat(resume.email, "</p>\n          <p>Phone: ").concat(resume.phone, "</p>\n          <p>Location: ").concat(resume.location, "</p>\n          <h3>Education</h3>\n          <p>").concat(resume.education, "</p>\n          <h3>Skills</h3>\n          <p>").concat(resume.skills, "</p>\n          <h3>Experience</h3>\n          <p>").concat(resume.experience, "</p>\n      ");
    }
    else {
        console.error('Resume Output element not found');
    }
};
var generateUniqueURL = function (id) {
    return "".concat(window.location.origin, "?resumeId=").concat(id);
};
var handleFormSubmit = function (event) {
    event.preventDefault();
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var locationElement = document.getElementById("location");
    var educationElement = document.getElementById("education");
    var skillsElement = document.getElementById("skills");
    var experienceElement = document.getElementById("experience");
    if (nameElement && emailElement && phoneElement && locationElement && educationElement && skillsElement && experienceElement) {
        var resumeData = {
            name: nameElement.value,
            email: emailElement.value,
            phone: phoneElement.value,
            location: locationElement.value,
            education: educationElement.value,
            skills: skillsElement.value,
            experience: experienceElement.value,
        };
        var resumeId = generateUUID();
        localStorage.setItem(resumeId, JSON.stringify(resumeData));
        updateResume(resumeData);
        var shareLink = generateUniqueURL(resumeId);
        var shareLinkElement = document.getElementById('shareLink');
        if (shareLinkElement) {
            shareLinkElement.innerHTML = "<p>Share your resume using this link:</p><a href=\"".concat(shareLink, "\" target=\"_blank\">").concat(shareLink, "</a>");
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
};
var loadResumeFromURL = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeId = urlParams.get('resumeId');
    if (resumeId) {
        var resumeData = localStorage.getItem(resumeId);
        if (resumeData) {
            updateResume(JSON.parse(resumeData));
        }
        else {
            console.error('Resume data not found');
        }
    }
};
(_a = document.getElementById("resume-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleFormSubmit);
window.addEventListener('load', loadResumeFromURL);
var handleResize = function () {
    var mobileView = window.matchMedia("(max-width: 600px)");
    if (mobileView.matches) {
        console.log("Switching to mobile view");
        document.body.style.fontSize = "14px";
    }
    else {
        console.log("Switching to desktop view");
        document.body.style.fontSize = "16px";
    }
};
window.addEventListener("resize", handleResize);
handleResize();
