import React from 'react';
import { Button } from '../../components/ui/Button';

const SectionTitle = ({ children, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-zen text-gray-900 dark:text-gray-100 mb-4">
            {children}
        </h2>
        {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {subtitle}
            </p>
        )}
        <div className="w-24 h-1 bg-byakko-red mx-auto mt-4 rounded-full" />
    </div>
);

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
        <div className="text-4xl mb-4 text-byakko-red">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const Home = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold font-zen text-white mb-6 drop-shadow-lg">
                        Karate Do <span className="text-byakko-red">Byakko</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
                        Disciplina, Tradición y Excelencia en cada movimiento.
                        <br />
                        Formamos carácter a través del Goju Ryu.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => window.location.href = '/sedes'}>
                            Encuentra tu Dojo
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                            Conoce más
                        </Button>
                    </div>
                </div>
            </section>

            {/* Sobre Nosotros */}
            <section className="max-w-7xl mx-auto px-4">
                <SectionTitle subtitle="Más que un deporte, un camino de vida.">
                    Nuestra Filosofía
                </SectionTitle>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <FeatureCard
                        icon="🥋"
                        title="Tradición"
                        description="Seguimos los lineamientos clásicos del Karate Goju Ryu, respetando el linaje de nuestros maestros."
                    />
                    <FeatureCard
                        icon="💪"
                        title="Fortaleza"
                        description="Entrenamiento físico riguroso adaptado a todas las edades para desarrollar cuerpo y mente."
                    />
                    <FeatureCard
                        icon="🤝"
                        title="Comunidad"
                        description="Somos una familia (Yuzenkai) donde el respeto y la camaradería son fundamentales."
                    />
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-byakko-gray dark:bg-gray-800 py-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-4 font-zen">¿Listo para comenzar?</h2>
                    <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                        La primera clase es de prueba. Ven y descubre el potencial que hay en ti.
                    </p>
                    <Button size="lg">Contáctanos Hoy</Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
