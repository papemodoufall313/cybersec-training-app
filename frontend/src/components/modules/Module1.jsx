import React from 'react';

const Module1 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>Module 1 : Introduction à la cybersécurité</h1>
                <div className="module-meta">Durée : 4 heures | Niveau : Débutant</div>
            </div>

            <div className="module-section">
                <h2>1.1 Qu'est-ce que la cybersécurité ?</h2>
                <p>La cybersécurité est l'ensemble des pratiques, technologies et processus conçus pour protéger les réseaux, les appareils, les programmes et les données contre les attaques.</p>
            </div>

            <div className="module-section">
                <h2>1.2 La triade CIA</h2>
                <ul>
                    <li><strong>Confidentialité :</strong> Seules les personnes autorisées peuvent accéder aux informations</li>
                    <li><strong>Intégrité :</strong> Les informations ne peuvent être modifiées que par des personnes autorisées</li>
                    <li><strong>Disponibilité :</strong> Les informations sont accessibles quand nécessaire</li>
                </ul>
            </div>

            <div className="module-section">
                <h2>1.3 Types de menaces</h2>
                <ul>
                    <li>Malware : virus, ransomware, spyware</li>
                    <li>Phishing : tentatives d'obtention d'informations sensibles</li>
                    <li>DoS/DDoS : attaques par déni de service</li>
                    <li>Man-in-the-Middle : interception de communications</li>
                </ul>
            </div>

            <div className="module-section">
                <h2>Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Analyse d'un cas réel</h3>
                    <p>Cas : Attaque SolarWinds (2020)</p>
                    <details>
                        <summary>Voir le corrigé</summary>
                        <p>Confidentialité et intégrité compromises. APT lié à un état-nation.</p>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Politique de sécurité MFA</h3>
                    <p>Rédigez une politique MFA en 5 points.</p>
                    <details>
                        <summary>Voir le corrigé</summary>
                        <p>MFA obligatoire, méthodes acceptées, ré-enregistrement périodique, exceptions validées, audit mensuel.</p>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>Ressources</h2>
                <ul>
                    <li><a href="https://owasp.org/">OWASP</a></li>
                    <li><a href="https://www.cisa.gov/">CISA</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module1;