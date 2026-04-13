import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExerciseView = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExercise();
    checkCompletion();
  }, [id]);

  const fetchExercise = async () => {
    try {
      const response = await axios.get(`/api/exercises/${id}`);
      setExercise(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkCompletion = async () => {
    try {
      const response = await axios.get(`/api/progress/stats`);
      // Vérification simplifiée - à améliorer avec une API dédiée
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleValidate = async () => {
    try {
      await axios.post(`/api/exercises/${id}/complete`);
      setMessage('✅ Exercice validé !');
      setCompleted(true);
      setTimeout(() => navigate(`/module/${exercise.module_id}`), 1500);
    } catch (error) {
      setMessage('❌ Erreur lors de la validation');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (!exercise) return <div className="error-msg">Exercice non trouvé</div>;

  return (
    <div>
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn">← Retour</button>
        <h1>{exercise.title}</h1>
      </div>

      <div className="exercise-container">
        <h3>Description</h3>
        <p>{exercise.description}</p>

        <h3>Instructions</h3>
        <p>{exercise.instructions}</p>

        {exercise.command_example && (
          <>
            <h3>Commande exemple</h3>
            <div className="command-box">
              <code>{exercise.command_example}</code>
            </div>
          </>
        )}

        {exercise.expected_output && (
          <>
            <h3>Sortie attendue</h3>
            <div className="command-box">
              <code>{exercise.expected_output}</code>
            </div>
          </>
        )}

        {!completed && (
          <button onClick={handleValidate} className="validate-btn">
            ✅ Valider l'exercice
          </button>
        )}

        {message && <div className={message.includes('✅') ? 'success-msg' : 'error-msg'}>{message}</div>}
      </div>
    </div>
  );
};

export default ExerciseView;