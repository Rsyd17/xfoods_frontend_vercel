import React from 'react';

function FormKonsultasi({ 
  prefMain, setPrefMain, 
  prefBev, setPrefBev, 
  prefSide, setPrefSide, 
  budget, setBudget, 
  handleCari, isLoading 
}) {
  
  const opsiMainRasa = ["manis", "asin", "gurih", "pedas", "asam"];
  const opsiMainKarbo = ["nasi", "mie", "bihun", "kwetiau", "roti"];
  const opsiMainProtein = ["ayam", "sapi", "udang", "cumi", "ikan", "kerang", "kepiting", "bebek", "kambing", "telur", "tahu", "tempe", "bakso", "sosis", 
    "pangsit", "jeroan","sayur"];
  const opsiBevRasa = ["manis", "asam", "pahit", "gurih", "segar"];
  const opsiSideRasa = ["manis", "asin", "gurih", "pedas", "pahit"];

  const toggleSelection = (item, state, setState) => {
    if (state.includes(item)) {
      setState(state.filter(i => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  const CheckboxGrid = ({ opsi, state, setState }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {opsi.map(item => (
        <label 
          key={item} 
          onClick={() => toggleSelection(item, state, setState)}
          className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-all duration-200 select-none ${
            state.includes(item) 
              ? 'bg-teal-50 border-teal-600 shadow-sm' 
              : 'bg-white border-stone-200 hover:border-teal-300 hover:bg-stone-50'
          }`}
        >
          <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
            state.includes(item) ? 'bg-teal-600 border-teal-600' : 'border-stone-300'
          }`}>
            {state.includes(item) && <span className="text-white text-[10px] font-bold">✓</span>}
          </div>
          <span className={`capitalize text-sm font-medium truncate ${
            state.includes(item) ? 'text-teal-900' : 'text-stone-600'
          }`}>{item}</span>
        </label>
      ))}
    </div>
  );

  return (
    <section id="konsultasi" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-900 mb-3">Form Konsultasi</h2>
          <p className="text-stone-500">Sesuaikan preferensi dengan selera Anda saat ini</p>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* Main Course */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-teal-100 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif shadow-sm">1</span>
              <h3 className="text-xl font-serif text-stone-800">Kategori Main Course</h3>
            </div>
            <div className="pl-0 md:pl-14 space-y-6">
              <div>
                <p className="text-stone-700 font-medium text-sm mb-3">Pilihan Rasa Dasar:</p>
                <CheckboxGrid opsi={opsiMainRasa} state={prefMain} setState={setPrefMain} />
              </div>
              <div>
                <p className="text-stone-700 font-medium text-sm mb-3">Sumber Karbohidrat:</p>
                <CheckboxGrid opsi={opsiMainKarbo} state={prefMain} setState={setPrefMain} />
              </div>
              <div>
                <p className="text-stone-700 font-medium text-sm mb-3">Protein & Lauk Utama:</p>
                <CheckboxGrid opsi={opsiMainProtein} state={prefMain} setState={setPrefMain} />
              </div>
            </div>
          </div>

          {/* Beverage */}
          <div className="mb-10 border-t border-stone-200 pt-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-teal-100 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif shadow-sm">2</span>
              <h3 className="text-xl font-serif text-stone-800">Kategori Beverage</h3>
            </div>
            <div className="pl-0 md:pl-14">
              <p className="text-stone-700 font-medium text-sm mb-3">Preferensi Rasa Minuman:</p>
              <CheckboxGrid opsi={opsiBevRasa} state={prefBev} setState={setPrefBev} />
            </div>
          </div>

          {/* Side Dish */}
          <div className="mb-10 border-t border-stone-200 pt-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-teal-100 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif shadow-sm">3</span>
              <h3 className="text-xl font-serif text-stone-800">Kategori Side Dish</h3>
            </div>
            <div className="pl-0 md:pl-14">
              <p className="text-stone-700 font-medium text-sm mb-3">Preferensi Rasa Pencuci Mulut / Cemilan:</p>
              <CheckboxGrid opsi={opsiSideRasa} state={prefSide} setState={setPrefSide} />
            </div>
          </div>

          {/* Budget & Submit */}
          <div className="mb-10 border-t border-stone-200 pt-10 pl-0 md:pl-14">
            <div className="flex justify-between items-end mb-6">
              <label className="text-lg font-serif text-stone-800 font-medium">Batasan Anggaran (Budget)</label>
              <span className="bg-white border border-stone-200 px-4 py-1.5 rounded-lg text-teal-700 text-lg font-bold shadow-sm">
                Rp {Number(budget).toLocaleString('id-ID')}
              </span>
            </div>
            <input 
              type="range" min="40000" max="150000" step="5000" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)} 
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          <div className="pl-0 md:pl-14">
            <button 
              onClick={handleCari}
              className="bg-teal-700 hover:bg-teal-800 text-white w-full md:w-auto px-10 py-4 rounded-xl font-medium transition duration-300 shadow-md shadow-teal-900/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Memproses Analisis...
                </>
              ) : "Analisis Rekomendasi →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormKonsultasi;
