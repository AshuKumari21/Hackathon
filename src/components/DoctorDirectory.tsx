import { useState } from 'react';
import type { Doctor } from '../types';
import { MOCK_DOCTORS } from '../data/mockData';
import { UserCheck, Search, MapPin, Phone, Calendar, Star, Database, CheckCircle2 } from 'lucide-react';

interface DoctorDirectoryProps {
  onEnqueueBooking: (doctor: Doctor) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({ onEnqueueBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const specialties = ['All', 'General Physician', 'Cardiologist', 'Pediatrician', 'Pulmonologist', 'Diabetologist'];

  const filteredDoctors = MOCK_DOCTORS.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clinicAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.languages.some((l) => l.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialty.includes(selectedSpecialty);
    
    const matchesDistance = doc.distanceKm <= maxDistance;

    return matchesSearch && matchesSpecialty && matchesDistance;
  });

  const handleBook = (doctor: Doctor) => {
    onEnqueueBooking(doctor);
    setBookingSuccessId(doctor.id);
    setTimeout(() => setBookingSuccessId(null), 3000);
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Nearby Verified Doctor Directory</h2>
            <p className="text-xs text-slate-400">Offline SQLite Spatial Geohash Index Lookup</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span>SQLite Offline Cache Active</span>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search doctor, clinic, or language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Specialty Filter */}
        <div className="sm:col-span-4">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                Specialty: {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Range Filter */}
        <div className="sm:col-span-3 flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap">Dist &lt; {maxDistance}km</span>
          <input
            type="range"
            min="2"
            max="30"
            step="1"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
        </div>
      </div>

      {/* SaaS Doctor Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs text-slate-200">
          <thead className="bg-slate-900/90 text-slate-400 font-mono border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Doctor & Specialty</th>
              <th className="py-3 px-4">Qualifications & Lang</th>
              <th className="py-3 px-4">Distance & Clinic</th>
              <th className="py-3 px-4">Fee & Rating</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Name & Specialty */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{doc.name}</div>
                    <div className="text-xs text-teal-400 font-medium">{doc.specialty}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{doc.experienceYears} Years Exp.</div>
                  </td>

                  {/* Qualifications & Languages */}
                  <td className="py-3 px-4">
                    <div className="text-slate-300 font-medium">{doc.qualifications}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doc.languages.map((lang) => (
                        <span key={lang} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Distance & Clinic */}
                  <td className="py-3 px-4 max-w-[200px]">
                    <div className="flex items-center gap-1 text-teal-300 font-semibold font-mono">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{doc.distanceKm} km away</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5" title={doc.clinicAddress}>
                      {doc.clinicAddress}
                    </div>
                  </td>

                  {/* Fee & Rating */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-emerald-400">₹{doc.consultationFee}</div>
                    <div className="flex items-center gap-1 text-amber-400 text-[11px]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doc.rating} / 5.0</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`tel:${doc.phoneNumber}`}
                        className="btn-outline text-[11px] py-1.5 px-2.5"
                        title="Call Doctor"
                      >
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span className="hidden md:inline">Call</span>
                      </a>

                      <button
                        onClick={() => handleBook(doc)}
                        className={`text-[11px] py-1.5 px-3 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                          bookingSuccessId === doc.id
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20'
                        }`}
                      >
                        {bookingSuccessId === doc.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Enqueued!</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book Slot</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-500 italic">
                  No doctors found matching filters within {maxDistance}km radius.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
