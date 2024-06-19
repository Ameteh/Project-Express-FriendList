let popupVisible = false;
let scrollable = true;

function database() {
    fetch("http://localhost:3000/api/schedule",{
        method: "GET", 
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json()).then((res) => {
        console.log(res)
        
        res.forEach((val, i) => {
            if(i % 2 == 0){
                addSchedule(val, "bar");
            }
            else{
                addSchedule(val, "bar2");
            }
        })
    }) 
}

database();

function fetchData() {
    fetch("./JS/result.json")
    .then((resp) => resp.json())
    .then((res) => {
        res.result.forEach((val, i) => {
            if(i % 2 == 0){
                addSchedule(val, "bar");
            }
            else{
                addSchedule(val, "bar2");
            }
        })
    })
}

function addSchedule(obj, clr){
    // Ambil akses list schedule
    let scheduleMap = document.getElementById('scheduleMap');

    // Kumpulkan semua data menjadi bagian masing-masing untuk dibuat detailnya
    let homePack = [obj.home_team, obj.home_score, obj.home_team_icon];
    let awayPack = [obj.away_team, obj.away_score, obj.away_team_icon];
    let matchDetail = [obj.matchtype, obj.status, obj.date];

    // Buat Isi detail tim
    const homeDetail = createTeamDetail(homePack);
    const awayDetail = createTeamDetail(awayPack);

    // Buat Detail hasil match
    const matchResult = createMatchResult(matchDetail);

    // Tim sebelah kiri
    const home = document.createElement("div");
    home.classList.add("score");
    homeDetail.forEach((el) => {
        home.appendChild(el);
    })

    // Detail di tengah
    const detail = document.createElement("div");
    detail.classList.add("tengah");
    matchResult.forEach((el) => {
        detail.appendChild(el);
    })

    // Tim sebelah kanan
    const away = document.createElement("div");
    away.classList.add("score", "score-flip");
    awayDetail.forEach((el) => {
        away.appendChild(el);
    })

    // Schedule baru
    const newBar = document.createElement("div");
    newBar.classList.add(clr);

    // Masukkan elemen-elemen schedule
    newBar.appendChild(home);
    newBar.appendChild(detail);
    newBar.appendChild(away);

    // Tambahkan listener supaya saat diclick bakal munculin popup
    newBar.setAttribute("onclick", "togglePopup()");

    // Tambahkan ke schedule map
    scheduleMap.appendChild(newBar);
}

function createTeamDetail(team){
    // Icon Tim
    const icon = document.createElement("div");
    const img = document.createElement("img")
    img.setAttribute("src", team[2]);
    img.setAttribute("width", "50px");
    icon.appendChild(img);

    // Nama Tim
    const teamName = document.createElement("div");
    teamName.appendChild(document.createTextNode(team[0]));

    // Score Tim
    const score = document.createElement("div");
    score.appendChild(document.createTextNode(team[1]));

    let result = [icon, teamName, score];

    return result;
}

function createMatchResult(match){
    // Judul Match
    const judul = document.createElement("div");
    judul.classList.add("tengah-judul");
    judul.appendChild(document.createTextNode(match[0]));

    // Status Match
    const status = document.createElement("div");
    status.classList.add("tengah-status");
    status.appendChild(document.createTextNode(match[1]));

    // Tanggal Match
    const date = document.createElement("div");
    date.classList.add("tengah-date");
    date.appendChild(document.createTextNode(match[2]));

    let result = [judul, status, date];

    return result;
}

function toggleScroll() {
    if(scrollable) {
        document.body.classList.remove('disable-scroll');
    }
    else{
        document.body.classList.add('disable-scroll');
    }

    scrollable = !scrollable;
}

function togglePopup(){
    if(popupVisible){
        document.getElementById("popup").classList.remove("hidden");
    }
    else{
        document.getElementById("popup").classList.add("hidden");
    }

    popupVisible = !popupVisible;
    toggleScroll();
}