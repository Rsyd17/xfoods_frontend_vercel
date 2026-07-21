import React, { useState, useEffect } from 'react';
import './index.css';

// Import semua komponen yang sudah dipisah
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CaraKerja from './components/CaraKerja';
import FormKonsultasi from './components/FormKonsultasi';
import HasilRekomendasi from './components/HasilRekomendasi';

function App() {
  const [prefMain, setPrefMain] = useState([]);
  const [prefBev, setPrefBev] = useState([]);
  const [prefSide, setPrefSide] = useState([]);
  const [budget, setBudget] = useState(40000);
  
  const [rekomendasi, setRekomendasi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCariRekomendasi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://kalisari-foods-taupe.vercel.app/api/rekomendasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pref_main: prefMain.join(" "),
          pref_bev: prefBev.join(" "),
          pref_side: prefSide.join(" "),
          budget: Number(budget)
        })
      });
      const result = await response.json();
      setRekomendasi(result.data);
      
  setTimeout(() => {
    const sectionHasil = document.getElementById('hasil');
    if (sectionHasil) {
      sectionHasil.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
    } catch (error) {
      console.error("Gagal memuat rekomendasi", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="font-sans text-zinc-300 bg-white min-h-screen pb-20">
      <Navbar />
      <Hero />
      <CaraKerja />
      
      {/* Melempar state dan fungsi ke komponen form sebagai "props" */}
      <FormKonsultasi 
        prefMain={prefMain} setPrefMain={setPrefMain}
        prefBev={prefBev} setPrefBev={setPrefBev}
        prefSide={prefSide} setPrefSide={setPrefSide}
        budget={budget} setBudget={setBudget}
        handleCari={handleCariRekomendasi}
        isLoading={isLoading}
      />

      {/* Komponen HasilRekomendasi sekarang pintar, dia bisa mengatur dirinya sendiri */}
      <HasilRekomendasi data={rekomendasi} />
      
    </div>
  );
}

export default App;
