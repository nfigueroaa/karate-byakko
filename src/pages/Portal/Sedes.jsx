import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import clsx from 'clsx';

const StaffCard = ({ name, role, rank, image }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-6 text-center border border-gray-100 dark:border-gray-700">
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200">
            {/* Placeholder image logic */}
            <img
                src={image || `https://ui-avatars.com/api/?name=${name}&background=D32F2F&color=fff`}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <h3 className="text-xl font-bold font-zen text-gray-900 dark:text-white">{name}</h3>
        <p className="text-byakko-red font-medium mb-2">{role}</p>
        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
            {rank}
        </span>
    </div>
);

const DojoCard = ({ name, address, schedule, mapLink, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={clsx(
            "rounded-xl p-6 border-l-4 shadow-sm transition-all cursor-pointer relative",
            isSelected
                ? "bg-white dark:bg-gray-800 border-byakko-red shadow-lg scale-[1.02] ring-2 ring-byakko-red/20"
                : "bg-gray-50 dark:bg-gray-900 border-gray-300 hover:shadow-md hover:bg-white dark:hover:bg-gray-800"
        )}
    >
        {isSelected && (
            <div className="absolute top-4 right-4 text-byakko-red">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
        )}
        <h3 className={clsx("text-2xl font-bold font-zen mb-2", isSelected ? "text-byakko-red" : "text-gray-900 dark:text-white")}>
            {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-start gap-2">
            📍 <span>{address}</span>
        </p>
        <div className="mb-6">
            <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2">Horarios</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {schedule.map((time, idx) => (
                    <li key={idx}>• {time}</li>
                ))}
            </ul>
        </div>
        <div className="flex gap-3">
            <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open(mapLink, '_blank'); }}>
                Ver en Mapa
            </Button>
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                Contactar Sede
            </Button>
        </div>
    </div>
);

const Sedes = () => {
    // Datos oficiales con IDs
    const dojos = [
        {
            id: 'hombu',
            name: "Honbu Dojo Byakko",
            address: "Puerto Montt (Dirección por confirmar)",
            schedule: ["Lunes, Miércoles y Viernes: 19:00 - 21:00", "Sábados: 10:00 - 12:00"],
            mapLink: "https://maps.google.com/?q=Puerto+Montt"
        },
        {
            id: 'guerrero',
            name: "Dojo Byakko Guerrero",
            address: "Puerto Montt (Dirección por confirmar)",
            schedule: ["Martes y Jueves: 18:30 - 20:00", "Sábados: 12:00 - 14:00"],
            mapLink: "https://maps.google.com/?q=Puerto+Montt"
        },
        {
            id: 'daikokuten',
            name: "Dojo Byakko Daikokuten",
            address: "Puerto Montt (Dirección por confirmar)",
            schedule: ["Lunes a Viernes: 17:00 - 18:30 (Infantil)", "18:30 - 20:00 (Adultos)"],
            mapLink: "https://maps.google.com/?q=Puerto+Montt"
        },
        {
            id: 'yosei',
            name: "Dojo Byakko Yōsei",
            address: "Santiago Cerrillos (Dirección por confirmar)",
            schedule: ["Lunes y Miércoles: 19:30 - 21:30", "Viernes: 19:00 - 21:00"],
            mapLink: "https://maps.google.com/?q=Cerrillos+Santiago"
        },
        {
            id: 'fudoshin',
            name: "Dojo Byakko Fudoshin",
            address: "Santiago Maipú (Dirección por confirmar)",
            schedule: ["Martes y Jueves: 19:00 - 21:00", "Sábados: 11:00 - 13:00"],
            mapLink: "https://maps.google.com/?q=Maipu+Santiago"
        }
    ];

    const staff = [
        {
            dojoId: 'hombu',
            name: "Ramón Muñoz",
            role: "Shihan Director General Byakko Chile",
            rank: "5° Dan",
            image: null
        },
        {
            dojoId: 'hombu',
            name: "Yessenia Muñoz",
            role: "Sensei Hombu Dojo",
            rank: "1° Dan",
            image: null
        },
        {
            dojoId: 'hombu',
            name: "Angel Muñoz",
            role: "Senpai Hombu Dojo",
            rank: "5° Kyu",
            image: null
        },
        {
            dojoId: 'guerrero',
            name: "Germán Guerrero",
            role: "Sensei Dojo Byakko Guerrero",
            rank: "2° Dan",
            image: null
        },
        {
            dojoId: 'daikokuten',
            name: "Luis Torres",
            role: "Sensei Dojo Byakko Daikokuten",
            rank: "1° Dan",
            image: null
        },
        {
            dojoId: 'yosei',
            name: "Rubén Díaz",
            role: "Sensei Dojo Byakko Yōsei",
            rank: "1° Dan",
            image: null
        },
        {
            dojoId: 'yosei',
            name: "Nelson Figueroa",
            role: "Sensei Dojo Byakko Yōsei",
            rank: "1° Dan",
            image: null
        },
        {
            dojoId: 'fudoshin',
            name: "Nelson Figueroa",
            role: "Sensei Dojo Byakko Fudoshin",
            rank: "1° Dan",
            image: null
        }
    ];

    const [selectedDojo, setSelectedDojo] = useState(dojos[0].id);

    const filteredStaff = staff.filter(member => member.dojoId === selectedDojo);
    const currentDojoName = dojos.find(d => d.id === selectedDojo)?.name;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-zen text-gray-900 dark:text-white mb-4">
                    Nuestras Sedes
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Selecciona un dojo para ver sus horarios e instructores.
                </p>
                <div className="w-24 h-1 bg-byakko-red mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-20 animate-fade-in-up">
                {dojos.map((dojo) => (
                    <DojoCard
                        key={dojo.id}
                        {...dojo}
                        isSelected={selectedDojo === dojo.id}
                        onClick={() => setSelectedDojo(dojo.id)}
                    />
                ))}
            </div>

            <div className="bg-byakko-gray dark:bg-gray-800 -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 py-16 transition-colors duration-500">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-zen text-gray-900 dark:text-white animate-fade-in">
                        Equipo Docente: <span className="text-byakko-red transition-all">{currentDojoName}</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Guiando tu camino en el Karate Do</p>
                </div>

                {filteredStaff.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto justify-center animate-fade-in">
                        {filteredStaff.map((member, idx) => (
                            <StaffCard key={idx} {...member} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-500 italic">Información de docentes por confirmar para esta sede.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sedes;
