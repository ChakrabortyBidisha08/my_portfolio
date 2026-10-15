/* =========================================================
   EDIT THIS OBJECT TO PERSONALIZE YOUR WEBSITE
   ========================================================= */

const profile = {

    name: "Your Name",

    photo: "assets/profile.jpg",

    cvUrl: "",

    roles: [
        "Research Scholar",
        "Machine Learning Researcher",
        "Federated Learning Researcher"
    ],

    intro:
        "I work at the intersection of machine learning, federated learning, trustworthy artificial intelligence, and intelligent systems.",

    about:
        "I am a researcher interested in developing intelligent learning systems that can operate effectively under distributed, heterogeneous, and privacy-sensitive environments. My work focuses on machine learning, federated learning, personalized learning, and trustworthy AI. I enjoy translating theoretical research ideas into practical experiments and working systems.",

    email: "you@example.com",

    socials: [
        {
            label: "GitHub",
            url: "https://github.com/"
        },
        {
            label: "LinkedIn",
            url: "https://linkedin.com/"
        },
        {
            label: "Google Scholar",
            url: "https://scholar.google.com/"
        }
    ],

    facts: [
        {
            label: "Current position",
            value: "Research Scholar"
        },
        {
            label: "Institution",
            value: "Your University / Institution"
        },
        {
            label: "Research areas",
            value: "Federated Learning · Machine Learning · Trustworthy AI"
        },
        {
            label: "Location",
            value: "India"
        }
    ],

    research: [
        {
            title: "Federated Learning",
            description:
                "Personalized and collaborative machine learning under statistically heterogeneous and distributed data.",
            tags: [
                "Federated Learning",
                "Personalization",
                "Non-IID Data"
            ]
        },

        {
            title: "Vision-Language Models",
            description:
                "Parameter-efficient adaptation and personalization of large pretrained vision-language models.",
            tags: [
                "CLIP",
                "Prompt Learning",
                "Computer Vision"
            ]
        },

        {
            title: "Trustworthy AI",
            description:
                "Developing learning systems with an emphasis on privacy, security, robustness, and responsible deployment.",
            tags: [
                "Privacy",
                "Security",
                "Robustness"
            ]
        }
    ],

    projects: [

        {
            title: "Personalized Federated Learning",
            category: "Research",

            description:
                "Research on personalized federated learning under heterogeneous client distributions.",

            details:
                "This project investigates personalized federated learning methods for clients operating under heterogeneous feature and label distributions. The work explores client similarity, adaptive aggregation, prompt learning, and personalized model adaptation.",

            tags: [
                "Federated Learning",
                "PyTorch",
                "Machine Learning"
            ],

            url: ""
        },

        {
            title: "Vision-Language Model Personalization",
            category: "Research",

            description:
                "Personalizing pretrained vision-language models using parameter-efficient learning mechanisms.",

            details:
                "This work explores personalized adaptation of pretrained vision-language models such as CLIP using lightweight trainable representations and federated optimization.",

            tags: [
                "CLIP",
                "Prompt Learning",
                "Computer Vision"
            ],

            url: ""
        },

        {
            title: "Data Structure Visualizer",
            category: "Software",

            description:
                "Interactive educational platform for understanding data structures and expression evaluation.",

            details:
                "An interactive tool designed to help learners understand stacks, queues, linked lists, expression conversion, and algorithm execution through visual demonstrations.",

            tags: [
                "JavaScript",
                "Algorithms",
                "Education"
            ],

            url: ""
        }
    ],

    publications: [

        {
            title: "Add your publication title here",
            authors: "Your Name, Co-author Name",
            venue: "Conference / Journal · 2026",
            url: ""
        },

        {
            title: "Add another publication or preprint here",
            authors: "Your Name, Co-author Name",
            venue: "Preprint / Workshop · 2026",
            url: ""
        }

    ]

};


/* =========================================================
   HELPERS
   ========================================================= */

const $ = selector => document.querySelector(selector);

const element = (tag, className, text) => {

    const el = document.createElement(tag);

    if (className) {
        el.className = className;
    }

    if (text !== undefined) {
        el.textContent = text;
    }

    return el;
};


const validLink = url => {

    try {

        const parsed = new URL(url, window.location.href);

        return ["https:", "http:", "mailto:"].includes(parsed.protocol);

    } catch {

        return false;
    }
};


/* =========================================================
   BASIC PROFILE INFORMATION
   ========================================================= */

document
    .querySelectorAll("[data-field]")
    .forEach(el => {

        const key = el.dataset.field;

        if (typeof profile[key] === "string") {
            el.textContent = profile[key];
        }

    });


document.title = `${profile.name} | Academic Portfolio`;

$("#year").textContent = new Date().getFullYear();


/* =========================================================
   PROFILE PHOTO
   ========================================================= */

const profileImage = $("#profileImage");
const photoFallback = $("#photoFallback");

profileImage.src = profile.photo;

profileImage.alt = `${profile.name} profile photograph`;

profileImage.addEventListener("error", () => {

    profileImage.style.display = "none";
    photoFallback.hidden = false;

});


/* =========================================================
   CV
   ========================================================= */

const cvButton = $("#cvButton");

if (profile.cvUrl && validLink(profile.cvUrl)) {

    cvButton.href = profile.cvUrl;

} else {

    cvButton.style.display = "none";

}


/* =========================================================
   EMAIL
   ========================================================= */

$("#emailButton").href = `mailto:${profile.email}`;

$("#emailText").textContent = profile.email;


/* =========================================================
   SOCIAL LINKS
   ========================================================= */

const socialRoot = $("#socialLinks");

profile.socials.forEach(social => {

    if (!validLink(social.url)) {
        return;
    }

    const link = element("a", "", social.label);

    link.href = social.url;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    socialRoot.append(link);

});


/* =========================================================
   FACTS
   ========================================================= */

const factsRoot = $("#facts");

profile.facts.forEach(fact => {

    const wrapper = element("div", "fact");

    wrapper.append(
        element("strong", "", fact.label),
        element("span", "", fact.value)
    );

    factsRoot.append(wrapper);

});


/* =========================================================
   TAGS
   ========================================================= */

function addTags(parent, tags = []) {

    const wrapper = element("div", "tags");

    tags.forEach(tag => {

        wrapper.append(
            element("span", "tag", tag)
        );

    });

    parent.append(wrapper);
}


/* =========================================================
   RESEARCH
   ========================================================= */

const researchRoot = $("#researchCards");

profile.research.forEach((item, index) => {

    const card = element(
        "article",
        "research-card"
    );

    const number = element(
        "div",
        "research-number",
        String(index + 1).padStart(2, "0")
    );

    const title = element(
        "h3",
        "",
        item.title
    );

    const description = element(
        "p",
        "",
        item.description
    );

    card.append(
        number,
        title,
        description
    );

    addTags(
        card,
        item.tags
    );

    researchRoot.append(card);

});


/* =========================================================
   PROJECT FILTERS
   ========================================================= */

const categories = [
    "All",
    ...new Set(
        profile.projects.map(project => project.category)
    )
];

let selectedCategory = "All";


function renderFilters() {

    const root = $("#filters");

    root.replaceChildren();


    categories.forEach(category => {

        const button = element(
            "button",
            `filter ${category === selectedCategory ? "active" : ""}`,
            category
        );

        button.type = "button";

        button.setAttribute(
            "aria-pressed",
            String(category === selectedCategory)
        );


        button.onclick = () => {

            selectedCategory = category;

            renderFilters();

            renderProjects();

        };


        root.append(button);

    });

}


/* =========================================================
   PROJECTS
   ========================================================= */

function renderProjects() {

    const root = $("#projectCards");

    root.replaceChildren();


    const projects = profile.projects.filter(project => {

        return (
            selectedCategory === "All" ||
            selectedCategory === project.category
        );

    });


    projects.forEach(project => {

        const card = element(
            "button",
            "project-card"
        );

        card.type = "button";


        const category = element(
            "span",
            "project-category",
            project.category
        );


        const title = element(
            "h3",
            "",
            project.title
        );


        const description = element(
            "p",
            "",
            project.description
        );


        const detailsLink = element(
            "span",
            "project-link",
            "View project details →"
        );


        card.append(
            category,
            title,
            description
        );


        addTags(
            card,
            project.tags
        );


        card.append(detailsLink);


        card.onclick = () => {

            showProject(project);

        };


        root.append(card);

    });

}


renderFilters();
renderProjects();


/* =========================================================
   PROJECT DIALOG
   ========================================================= */

function showProject(project) {

    const body = $("#modalBody");

    body.replaceChildren();


    const category = element(
        "p",
        "section-label",
        project.category
    );


    const title = element(
        "h2",
        "",
        project.title
    );


    const description = element(
        "p",
        "",
        project.details
    );


    body.append(
        category,
        title,
        description
    );


    addTags(
        body,
        project.tags
    );


    if (
        project.url &&
        validLink(project.url)
    ) {

        const link = element(
            "a",
            "button primary",
            "View project"
        );

        link.href = project.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.style.marginTop = "25px";

        body.append(link);

    }


    $("#projectDialog").showModal();

}


$("#closeDialog").onclick = () => {

    $("#projectDialog").close();

};


$("#projectDialog").addEventListener(
    "click",
    event => {

        if (
            event.target === $("#projectDialog")
        ) {

            $("#projectDialog").close();

        }

    }
);


/* =========================================================
   PUBLICATIONS
   ========================================================= */

const publicationRoot =
    $("#publicationList");


profile.publications.forEach(publication => {

    const row = element(
        "article",
        "publication"
    );


    const details = element("div");


    const title = element(
        "h3",
        "",
        publication.title
    );


    const authors = element(
        "p",
        "",
        publication.authors || ""
    );


    const venue = element(
        "p",
        "",
        publication.venue
    );


    details.append(
        title,
        authors,
        venue
    );


    row.append(details);


    if (
        publication.url &&
        validLink(publication.url)
    ) {

        const link = element(
            "a",
            "",
            "Paper →"
        );


        link.href = publication.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";


        row.append(link);

    }


    publicationRoot.append(row);

});


/* =========================================================
   ROTATING ROLE
   ========================================================= */

if (profile.roles.length > 0) {

    const roleElement =
        $("#animatedRole");

    roleElement.textContent =
        profile.roles[0];


    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches &&
        profile.roles.length > 1
    ) {

        let roleIndex = 0;


        setInterval(() => {

            roleIndex =
                (roleIndex + 1) %
                profile.roles.length;


            roleElement.textContent =
                profile.roles[roleIndex];

        }, 3000);

    }

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
    $("#menuToggle");

const nav =
    $("#nav");


menuToggle.onclick = () => {

    const opened =
        nav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(opened)
    );

};


document
    .querySelectorAll("#nav a")
    .forEach(link => {

        link.onclick = () => {

            nav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        };

    });
