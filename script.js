function toggleMenu() {
        document.querySelector(".burger").classList.toggle("active");
        document.querySelector(".menu").classList.toggle("show");
    }
    
    let bestilling = [];
    
    document.addEventListener("DOMContentLoaded", () => {
        vismenu();
        lastBestillingFraStorage();
    
        document.getElementById('clear-order').addEventListener('click', () => {
            const bekreft = confirm("Er du sikker på at du vil tømme bestillingen?");
            if (!bekreft) return;
           
            const varebestilling = document.getElementById('varebestilling'); // Legg til denne linjen
            varebestilling.innerHTML = ""; // Tøm listen

            bestilling = [];
            localStorage.removeItem('bestilling');
            document.getElementById('totalpris').textContent = "Totalpris: 0 kr";

            varebestilling.innerHTML = "";
    
            bestilling = [];
            localStorage.removeItem('bestilling');
    
            const totalEl = document.getElementById('totalpris');
            if (totalEl) {
                totalEl.textContent = "Totalpris: 0 kr";
            }
        });
    });
    
    async function vismenu() {
        try {
            const svar = await fetch('app.json');
            const varer = await svar.json();
            const menu = document.querySelector('.menu-liste');
    
            varer.forEach(vare => {
                const li = document.createElement('li');
                li.textContent = `${vare.navn} - ${vare.pris} kr`;
    
                li.addEventListener('click', () => {
                    leggTilVare(vare.navn, vare.pris);
                });
    
                menu.appendChild(li);
            });
        } catch (error) {
            console.error("Feil ved henting av meny:", error);
        }
    }
    
    function leggTilVare(vareNavn, varePris) {
        leggTilVareBareDOM(vareNavn, varePris);
        bestilling.push({ navn: vareNavn, pris: varePris });
        oppdaterLagringOgPris();
    }
    
    function leggTilVareBareDOM(vareNavn, varePris) {
        const varebestilling = document.getElementById('varebestilling');
        const li = document.createElement('li');
        li.textContent = `${vareNavn} - ${varePris} kr`;
    
        const fjernVare = document.createElement('button');
        fjernVare.textContent = "Fjern";
        fjernVare.style.marginLeft = "10px";
        fjernVare.addEventListener('click', () => {
            varebestilling.removeChild(li);
            const index = bestilling.findIndex(v => v.navn === vareNavn && v.pris === varePris);
if (index !== -1) {
    bestilling.splice(index, 1);
}
            oppdaterLagringOgPris();
        });
    
        li.appendChild(fjernVare);
        varebestilling.appendChild(li);
    }
    
    function lastBestillingFraStorage() {
        const lagret = localStorage.getItem('bestilling');
        if (lagret) {
            bestilling = JSON.parse(lagret);
            bestilling.forEach(vare => {
                leggTilVareBareDOM(vare.navn, vare.pris);
            });
            visTotalPris();
        }
    }
    
    function oppdaterLagringOgPris() {
        localStorage.setItem('bestilling', JSON.stringify(bestilling));
        visTotalPris();
    }
    
    function visTotalPris() {
        let total = bestilling.reduce((sum, vare) => sum + vare.pris, 0);
        let totalEl = document.getElementById('totalpris');
    
        if (!totalEl) {
            totalEl = document.createElement('p');
            totalEl.id = 'totalpris';
            document.getElementById('order').appendChild(totalEl);
        }
    
        totalEl.textContent = `Totalpris: ${total} kr`;
    }



  document.addEventListener('DOMContentLoaded', function () {
        const skjema = document.getElementById('bestillingsskjema');
        const bekreftelse = document.getElementById('bekreftelse');
      
        if (skjema) {
          skjema.addEventListener('submit', function (e) {
            e.preventDefault();
      
            if (!skjema.checkValidity()) {
              skjema.reportValidity();
              return;
            }
      

            skjema.reset();
            if (bekreftelse) {
              bekreftelse.style.display = 'block';
            }
          });
        }
      });
      