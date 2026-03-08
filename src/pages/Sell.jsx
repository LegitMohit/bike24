import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';

// ── Step definitions ────────────────────────────────────────────────
const STEPS = [
    { label: 'Basic Details' },
    { label: 'Upload Photos' },
    { label: 'Review & Submit' },
];

// ── Progress Bar ────────────────────────────────────────────────────
const ProgressBar = ({ current, total }) => {
    const pct = Math.round(((current) / total) * 100);
    return (
        <div className="px-6 pt-4 pb-3">
            <div className="flex items-center justify-between mb-2">
                {STEPS.map((s, i) => (
                    <span
                        key={i}
                        className={`text-[10px] font-semibold tracking-wide uppercase transition-colors duration-300 ${i + 1 === current
                            ? 'text-[#3B82F6]'
                            : i + 1 < current
                                ? 'text-green-500'
                                : 'text-gray-300'
                            }`}
                    >
                        {s.label}
                    </span>
                ))}
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-[#3B82F6] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

// ── Indian number formatter ─────────────────────────────────────────
// Converts raw digit string to Indian comma format: 1234567 → 12,34,567
const formatIndian = (numStr) => {
    if (!numStr) return '';
    const s = String(numStr).replace(/,/g, '');
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    let remaining = s.slice(0, s.length - 3);
    let result = last3;
    while (remaining.length > 2) {
        result = remaining.slice(-2) + ',' + result;
        remaining = remaining.slice(0, remaining.length - 2);
    }
    if (remaining.length > 0) result = remaining + ',' + result;
    return result;
};

// ── Step 1 – Basic Details ──────────────────────────────────────────
const Step1 = ({ data, onChange, onNext }) => {
    const isYearValid = data.year.length === 4;
    const isFormValid = data.brand && data.model && data.city && isYearValid && data.kmDriven && data.price;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onNext();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 pb-6 gap-0 overflow-y-auto min-h-0">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Input
                    label="Brand *"
                    name="brand"
                    placeholder="Royal Enfield"
                    value={data.brand}
                    onChange={onChange}
                />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <Input
                    label="Model *"
                    name="model"
                    placeholder="Classic 350"
                    value={data.model}
                    onChange={onChange}
                />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <Input
                    label="City *"
                    name="city"
                    placeholder="e.g. Mumbai"
                    value={data.city}
                    onChange={onChange}
                />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <Input
                    label="Year of Manufacture *"
                    name="year"
                    placeholder="2021"
                    value={data.year}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                        onChange({ target: { name: 'year', value: val } });
                    }}
                    maxLength={4}
                />
                {!isYearValid && data.year.length > 0 && (
                    <p className="text-[10px] text-red-500 font-medium ml-1 -mt-2 mb-2">Year must be 4 digits</p>
                )}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <Input
                    label="KM Driven *"
                    name="kmDriven"
                    placeholder="e.g. 12,400"
                    value={formatIndian(data.kmDriven)}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 5);
                        onChange({ target: { name: 'kmDriven', value: digits } });
                    }}
                />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                <Input
                    label="Your Asking Price (Rs.)"
                    name="price"
                    placeholder="e.g. 1,40,000"
                    value={formatIndian(data.price)}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 7);
                        onChange({ target: { name: 'price', value: digits } });
                    }}
                />
            </div>

            {/* Condition Notes textarea */}
            <div className="w-full flex flex-col items-start gap-1 mb-2.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <label className="text-xs font-semibold text-gray-700 ml-1">Condition Notes</label>
                <textarea
                    name="conditionNotes"
                    placeholder="Single owner, all service records…"
                    value={data.conditionNotes}
                    onChange={onChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-neutral-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-xl text-base outline-none transition-all placeholder:text-gray-400 shadow-sm resize-none"
                />
            </div>

            <div className="mt-auto pt-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                    Next: Upload Photos →
                </Button>
            </div>
        </form>
    );
};

// ── Step 2 – Upload Photos ──────────────────────────────────────────
const DocUploadTile = ({ id, label, icon, file, onFile, onClear }) => {
    const preview = file ? URL.createObjectURL(file) : null;
    return (
        <div className="flex-1 relative">
            <label
                htmlFor={id}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 w-full
                    ${file
                        ? 'border-[#3B82F6] bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:border-[#3B82F6] hover:bg-blue-50'
                    }`}
            >
                {preview ? (
                    <img src={preview} alt={label} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                ) : (
                    <span className="text-2xl">{icon}</span>
                )}
                <span className={`text-xs font-semibold ${file ? 'text-[#3B82F6]' : 'text-gray-500'}`}>
                    {file ? file.name.slice(0, 14) + '…' : 'Tap to upload'}
                </span>
                <input
                    id={id}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
                />
            </label>
            {file && onClear && (
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); onClear(); }}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/70 transition z-10"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

const CAMERA_TIPS = [
    'Front & rear — full view',
    'Both side profiles',
    'Engine close-up',
    'Odometer reading',
    'Any scratches or dents',
];

const Step2 = ({ photos, setPhotos, rcBook, setRcBook, insurance, setInsurance, onNext, onBack }) => {
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((f) => URL.createObjectURL(f));
        setPhotos((prev) => [...prev, ...urls].slice(0, 6));
    };

    const removePhoto = (idx) => {
        setPhotos((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto gap-5 min-h-0">

            {/* ── Bike Photos ── */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bike Photos</h3>
                <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#3B82F6] rounded-2xl bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                >
                    <svg className="w-8 h-8 text-[#3B82F6] mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="text-sm font-semibold text-[#3B82F6]">Tap to upload photos</span>
                    <span className="text-xs text-gray-400 mt-0.5">Up to 6 photos • JPG, PNG</span>
                    <input id="photo-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
                </label>

                {photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {photos.map((src, i) => (
                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                                <img src={src} alt={`photo-${i}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/70 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {photos.length === 0 && (
                    <p className="text-center text-xs text-gray-400 mt-2">Listings with photos sell 3× faster!</p>
                )}
            </div>

            {/* ── Documents ── */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Documents</h3>
                <div className="flex gap-3">
                    <div className="flex-1 flex flex-col">
                        <span className="text-[11px] font-bold text-gray-600 mb-2 ml-1">RC Book</span>
                        <DocUploadTile
                            id="rc-upload"
                            label="RC Book"
                            icon="📄"
                            file={rcBook}
                            onFile={setRcBook}
                            onClear={() => setRcBook(null)}
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="text-[11px] font-bold text-gray-600 mb-2 ml-1">Insurance</span>
                        <DocUploadTile
                            id="insurance-upload"
                            label="Insurance"
                            icon="🛡️"
                            file={insurance}
                            onFile={setInsurance}
                            onClear={() => setInsurance(null)}
                        />
                    </div>
                </div>
            </div>

            {/* ── Camera Tips ── */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                <h3 className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest mb-2">📷 Camera Tips</h3>
                <ul className="flex flex-col gap-1.5">
                    {CAMERA_TIPS.map((tip, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Navigation ── */}
            <div className="mt-auto pt-1 flex flex-col gap-2">
                <Button variant="primary" onClick={onNext}>
                    Next: Review &amp; Submit →
                </Button>
                <Button variant="secondary" onClick={onBack}>
                    ← Back
                </Button>
            </div>
        </div>
    );
};

// ── Step 3 – Review & Submit ────────────────────────────────────────
const ReviewRow = ({ label, value }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
        <span className="text-sm font-semibold text-gray-800 text-right max-w-[55%]">{value || <span className="text-gray-300 italic">—</span>}</span>
    </div>
);

const Step3 = ({ data, photos, onBack, onSubmit }) => {
    return (
        <div className="flex-1 overflow-y-auto px-6 pb-8 min-h-0">
            {/* Photos strip — full row, horizontally scrollable */}
            {photos.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2 animate-in fade-in duration-500">
                    {photos.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt=""
                            className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-sm"
                        />
                    ))}
                </div>
            )}

            {/* Details card */}
            <div className="mt-4 bg-neutral-50 rounded-2xl px-4 py-1 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ReviewRow label="Brand" value={data.brand} />
                <ReviewRow label="Model" value={data.model} />
                <ReviewRow label="City" value={data.city} />
                <ReviewRow label="Year" value={data.year} />
                <ReviewRow label="KM Driven" value={data.kmDriven} />
                <ReviewRow label="Price" value={data.price} />
                <ReviewRow label="Condition" value={data.conditionNotes} />
            </div>

            {/* Info chip */}
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-3 items-start animate-in fade-in duration-700 delay-200">
                <svg className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                </svg>
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    Our team will verify your listing within 24 hours. Once approved, it will be visible to buyers.
                </p>
            </div>

            {/* Navigation buttons — naturally below all content */}
            <div className="mt-6 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 pb-2">
                <Button variant="primary" onClick={onSubmit}>
                    🎉 Submit Listing
                </Button>
                <Button variant="secondary" onClick={onBack}>
                    ← Back
                </Button>
            </div>
        </div>
    );
};

// ── Success Screen ──────────────────────────────────────────────────
const SuccessScreen = ({ onDone }) => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
            <svg className="w-12 h-12 text-[#3B82F6]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Listing Submitted!</h2>
        <p className="text-sm text-gray-500 font-medium mb-8 max-w-xs leading-relaxed">
            Your bike has been submitted for review. We'll notify you once it's live on the platform.
        </p>
        <Button variant="primary" onClick={onDone}>
            Go to Home
        </Button>
    </div>
);

// ── Main Sell Page ──────────────────────────────────────────────────
const Sell = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [rcBook, setRcBook] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        city: '',
        year: '',
        kmDriven: '',
        price: '',
        conditionNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const subtitle = `Step ${step} of ${STEPS.length}  —  ${STEPS[step - 1].label}`;

    return (
        <div className="flex flex-col w-full flex-1 min-h-0 animate-in fade-in duration-700">
            <PageHeader title="Sell Your Bike" subtitle={submitted ? 'All done! 🎉' : subtitle} />

            {!submitted && <ProgressBar current={step} total={STEPS.length} />}

            {submitted ? (
                <SuccessScreen onDone={() => navigate('/home')} />
            ) : step === 1 ? (
                <Step1 data={formData} onChange={handleChange} onNext={() => setStep(2)} />
            ) : step === 2 ? (
                <Step2
                    photos={photos} setPhotos={setPhotos}
                    rcBook={rcBook} setRcBook={setRcBook}
                    insurance={insurance} setInsurance={setInsurance}
                    onNext={() => setStep(3)} onBack={() => setStep(1)}
                />
            ) : (
                <Step3 data={formData} photos={photos} onBack={() => setStep(2)} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default Sell;
