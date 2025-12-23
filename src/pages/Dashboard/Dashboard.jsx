import React, { useEffect } from 'react';
import { useExcel } from '../../hooks/useExcel';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { AttendanceChart } from '../../components/dashboard/AttendanceChart';
import { Button } from '../../components/ui/Button';

const Dashboard = () => {
    const { data, loading, error, parseExcel } = useExcel();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) parseExcel(file);
    };

    // Calcular métricas simples basadas en datos o mostrar defaults
    const totalStudents = data ? data.length : 120;
    const activeStudents = data ? data.filter(s => s.status === 'Activo').length : 98;
    const avgAttendance = 85;

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Simple */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block p-4">
                <nav className="space-y-2">
                    <button className="w-full text-left px-4 py-2 bg-red-50 text-byakko-red rounded-lg font-medium">Resumen General</button>
                    <button className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Alumnos</button>
                    <button className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Asistencia</button>
                    <button className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Pagos</button>
                </nav>

                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Importar Datos</p>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-byakko-red file:text-white
                        hover:file:bg-red-700
                        cursor-pointer"
                    />
                    {loading && <p className="text-xs text-blue-500 mt-2">Cargando...</p>}
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold font-zen text-gray-900 dark:text-white">Panel de Control</h1>
                    <div className="text-sm text-gray-500">Última actualización: Hoy, 10:00 AM</div>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard
                        title="Alumnos Totales"
                        value={totalStudents}
                        icon={<span className="text-xl">🥋</span>}
                        color="blue"
                        trend={2.5}
                    />
                    <KpiCard
                        title="Asistencia Promedio"
                        value={`${avgAttendance}%`}
                        icon={<span className="text-xl">📊</span>}
                        color="green"
                        trend={5}
                    />
                    <KpiCard
                        title="Nuevos Inscritos"
                        value="12"
                        icon={<span className="text-xl">👶</span>}
                        color="purple"
                    />
                    <KpiCard
                        title="Cuotas Pendientes"
                        value="5"
                        icon={<span className="text-xl">⚠️</span>}
                        color="red"
                        trend={-2}
                    />
                </div>

                {/* Charts Area */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <AttendanceChart data={null} />
                    </div>

                    {/* Recent Activity / List */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Alumnos Destacados</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors p-2 rounded-lg cursor-pointer">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {i}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Alumno Ejemplo {i}</p>
                                        <p className="text-xs text-gray-500">Asistencia perfecta</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4">Ver todos</Button>
                    </div>
                </div>

                {/* Data Preview Table (if uploaded) */}
                {data && (
                    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm overflow-x-auto">
                        <h3 className="font-bold mb-4">Datos Importados</h3>
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key} className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 5).map((row, idx) => (
                                    <tr key={idx} className="border-b dark:border-gray-700">
                                        {Object.values(row).map((val, i) => (
                                            <td key={i} className="px-4 py-2">{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-xs text-gray-500 mt-2">Mostrando los primeros 5 registros.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
