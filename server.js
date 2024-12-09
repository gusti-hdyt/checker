const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint untuk evaluasi spesifikasi
const laptopEvaluations = []; // Menyimpan data sementara di memori

app.post("/evaluate", (req, res) => {
    const { ram, cores, userAgent, platform } = req.body;

    if (!ram || !cores || !userAgent || !platform) {
        return res.status(400).send("Incomplete specifications.");
    }

    const evaluation = {
        autocad: ram >= 8 && cores >= 2,
        solidworks: ram >= 16 && cores >= 4,
        autodeskInventor: ram >= 16 && cores >= 4,
        ram,
        cores,
        userAgent,
        platform,
        timestamp: new Date(),
    };

    // Cek apakah data sudah ada
    const exists = laptopEvaluations.some(
        (item) =>
            item.ram === evaluation.ram &&
            item.cores === evaluation.cores &&
            item.userAgent === evaluation.userAgent &&
            item.platform === evaluation.platform
    );

    // Hanya tambahkan jika tidak ada data yang sama
    if (!exists) {
        laptopEvaluations.push(evaluation);
    }

    res.status(200).json(evaluation);
});


// Endpoint untuk mengambil data di dashboard
app.get("/dashboard-data", (req, res) => {
    res.status(200).json(laptopEvaluations);
});



// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
