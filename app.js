const loadservices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
        .then((res) => res.json())
        .then((data) => displayService(data))
        .catch((err) => console.log(err));

};
const displayService = (services) => {
    // console.log(services);
    services.forEach((service) => {
        console.log(service)
        const parent = document.getElementById("service-container");
        const li = document.createElement("li");
        li.innerHTML = `
                        <div class="card shadow h-100" >
                            <div class="ratio ratio-16x9">
                                <img src=${service.image} alt="...">
                            </div>
                            <div class="card-body p-3 p-xl-5">
                                <h3 class="card-title h5">${service.name}</h3>
                                <p class="card-text">${service.description.slice(0, 140)}</p>
                                <div><a href="#" class="btn btn-primary">Detail</a>
                                </div>
                            </div>
                        </div >`;
        parent.appendChild(li);

    });
};

const loadDoctors = (search) => {
    document.getElementById("doctors").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    console.log(search);
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search ? search : ""}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.results.length > 0) {
                document.getElementById("spinner").style.display = "none";
                document.getElementById("nodata").style.display = "none";
                displayDoctors(data?.results);
            } else {
                document.getElementById("doctors").innerHTML = "";
                document.getElementById("nodata").style.display = "block";
                document.getElementById("spinner").style.display = "none";

            }

        });

};

const displayDoctors = (doctors) => {
    doctors?.forEach((doctor) => {
        // console.log(doctor);
        const parent = document.getElementById("doctors");
        const div = document.createElement("div");
        div.classList.add("doc-card");
        div.innerHTML = `
                <img class="doc-img" src="${doctor.image}" alt="">
                        <h4>${doctor?.full_name}</h4>
                        <h6>${doctor?.designation[0]}</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, possimus.</p>
                        <p>

                        ${doctor?.specialization?.map((item) => {
            return `<button>${item}</button>`;
        })}
                        </p>
                
                        <button> <a target="_blank" href="docDetail.html?doctorId=${
                            doctor.id
                        }">Details</a></button>
                    
        `;
        parent.appendChild(div);
    });
};
const loadDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-des");
                const li = document.createElement("li");
                li.classList.add("dropdown-item");
                li.innerHTML = `
                <li onclick="loadDoctors('${item.name}')">${item.name}</li>`;
                parent.appendChild(li);

            });
        });

};
const loadSpecialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-spe");
                const li = document.createElement("li");
                li.classList.add("dropdown-item");
                li.innerHTML = `
                <li onclick="loadDoctors('${item.name}')">${item.name}</li>`;
                parent.appendChild(li);

            });
        });

};
const handleSearch = () => {
    const value = document.getElementById("search").value
    console.log(value);
    loadDoctors(value)

};
const loadReview = () => {
    fetch("https://testing-8az5.onrender.com/doctor/review/")
        .then((res) => res.json())
        .then((data) => displayReview(data));
}

const displayReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("review-container");
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
                <img src="./Images/girl.png" alt=""/>
                    <h4>${review.reviewer}</h4>
                    <p>
                    ${review.body.slice(0, 100)}
                    </p>
                    <h6>
                    ${review.rating}
                    </h6>
                `;
        parent.appendChild(div);
    });
};




loadDesignation();
loadSpecialization();
loadservices();
loadDoctors();
loadReview();
