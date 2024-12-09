document.getElementById("detectSpecs").addEventListener("click", async () => {
    const specs = {
        ram: navigator.deviceMemory || "Unknown",
        cores: navigator.hardwareConcurrency || "Unknown",
        userAgent: navigator.userAgent || "Unknown",
        platform: navigator.platform || "Unknown",
    };

    if (specs.ram === "Unknown" || specs.cores === "Unknown") {
        alert("Unable to detect your device specifications.");
        return;
    }

    try {
        // Kirim spesifikasi ke backend
        const response = await fetch("/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(specs),
        });

        const result = await response.json();

        // Tampilkan hasil ke pengguna
        document.getElementById("result").innerHTML = `
            <p><strong>Compatibility Results:</strong></p>
            <ul>
                <li>AutoCAD: ${result.autocad ? "Compatible" : "Not Compatible"}</li>
                <li>Solidworks: ${result.solidworks ? "Compatible" : "Not Compatible"}</li>
                <li>Autodesk Inventor: ${result.autodeskInventor ? "Compatible" : "Not Compatible"}</li>
            </ul>
        `;
    } catch (error) {
        console.error("Error:", error);
    }
});

function detectSpecs() {
    const specs = {
        ram: navigator.deviceMemory || "Unknown", // RAM (GB)
        cores: navigator.hardwareConcurrency || "Unknown", // Jumlah core CPU
        platform: navigator.platform || "Unknown", // Platform OS
        userAgent: navigator.userAgent || "Unknown", // User agent browser
    };

    // Tampilkan spesifikasi ke pengguna (opsional)
    document.getElementById("result").innerHTML = `<p>Detecting specifications...</p>`;

    // Kirim data ke server
    sendSpecsToServer(specs);
}

async function sendSpecsToServer(specs) {
    try {
        const response = await fetch("/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(specs),
        });

        if (response.ok) {
            const result = await response.json();

            // Tampilkan hasil kompatibilitas di halaman pengguna
            document.getElementById("result").innerHTML = `
                <p><strong>Detected Specifications:</strong></p>
                <ul>
                    <li>RAM: ${specs.ram} GB</li>
                    <li>CPU Cores: ${specs.cores}</li>
                    <li>Platform: ${specs.platform}</li>
                    <li>User Agent: ${specs.userAgent}</li>
                </ul>
                <p><strong>Compatibility Results:</strong></p>
                <ul>
                    <li>AutoCAD: ${result.autocad ? "Compatible" : "Not Compatible"}</li>
                    <li>Solidworks: ${result.solidworks ? "Compatible" : "Not Compatible"}</li>
                    <li>Autodesk Inventor: ${result.autodeskInventor ? "Compatible" : "Not Compatible"}</li>
                </ul>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p>Error: Failed to evaluate specifications.</p>`;
        }
    } catch (error) {
        console.error("Error sending data to server:", error);
        document.getElementById("result").innerHTML = `<p>Error: Unable to send data to server.</p>`;
    }
}

// Event listener untuk tombol
document.getElementById("detectSpecs").addEventListener("click", detectSpecs);

