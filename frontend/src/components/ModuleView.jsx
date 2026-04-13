import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModuleContent from './ModuleContent';

const ModuleView = () => {
    const { id } = useParams();
    const [module, setModule] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchModule();
    }, [id]);

    const fetchModule = async () => {
        try {
            const response = await axios.get(`/api/modules/${id}`);
            setModule(response.data.module);
            setExercises(response.data.exercises);
            setProgress(response.data.progress);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Chargement...</div>;
    if (!module) return <div className="error-msg">Module non trouvé</div>;

    const completedCount = exercises.filter(ex => progress[ex.id]).length;
    const progressPercent = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0;

    return (
        <div>
            <div className="header">
                <button onClick={() => navigate('/')} className="back-btn">← Retour</button>
                <h1>{module.title}</h1>
            </div>

            <div className="exercise-container">
                <p>{module.description}</p>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <p>Progression : {completedCount}/{exercises.length} exercices</p>
                
                <button 
                    onClick={() => setShowContent(!showContent)} 
                    style={{
                        background: '#0055A4',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        width: '100%'
                    }}
                >
                    {showContent ? '📖 Masquer le cours' : '📖 Voir le cours complet'}
                </button>
            </div>

            {showContent && <ModuleContent moduleId={parseInt(id)} />}

            <div className="modules-list">
                <h2>📝 Exercices pratiques</h2>
                {exercises.map((exercise, index) => (
                    <div
                        key={exercise.id}
                        className={`module-card ${progress[exercise.id] ? 'completed' : ''}`}
                        onClick={() => navigate(`/exercise/${exercise.id}`)}
                    >
                        <div className="module-title">
                            {index + 1}. {exercise.title}
                            {progress[exercise.id] && <span className="badge">✅ Validé</span>}
                        </div>
                        <div className="module-desc">{exercise.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModuleView;