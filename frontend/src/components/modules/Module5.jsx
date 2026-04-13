import React from 'react';

const Module5 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>Module 5 : Securite des applications web</h1>
                <div className="module-meta">Duree : 8 heures | Niveau : Avance</div>
            </div>

            <div className="module-section">
                <h2>5.1 OWASP Top 10</h2>
                <ol>
                    <li>Controle d acces defaillant</li>
                    <li>Defaillances cryptographiques</li>
                    <li>Injection (SQL, NoSQL)</li>
                    <li>Conception non securisee</li>
                    <li>Mauvaise configuration</li>
                    <li>Composants vulnerables</li>
                    <li>Echecs d identification</li>
                    <li>Defauts de logiciels</li>
                    <li>Echecs de monitoring</li>
                    <li>CSRF</li>
                </ol>
            </div>

            <div className="module-section">
                <h2>5.2 Injection SQL</h2>
                <div className="command-box">
                    # Login vulnerable<br />
                    SELECT * FROM users WHERE username=user AND password=pass<br /><br />
                    # Injection : admin --
                </div>
                <div className="note-box">
                    Bonne pratique : Utilisez des requetes parametrees
                </div>
            </div>

            <div className="module-section">
                <h2>5.3 XSS (Cross-Site Scripting)</h2>
                <div className="command-box">
                    &lt;script&gt;alert(1)&lt;/script&gt;<br />
                    &lt;img src=x onerror=alert(1)&gt;
                </div>
            </div>

            <div className="module-section">
                <h2>5.4 CSRF</h2>
                <p>Attaque forÃ§ant un utilisateur a executer une action non desiree.</p>
                <div className="note-box">
                    Protection : Tokens CSRF, SameSite cookies
                </div>
            </div>

            <div className="module-section">
                <h2>5.5 Outils de test</h2>
                <ul>
                    <li>Burp Suite - Proxy d interception</li>
                    <li>OWASP ZAP - Scanner de vulnerabilites</li>
                    <li>SQLmap - Injection SQL automatisee</li>
                </ul>
            </div>

            <div className="module-section">
                <h2>Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Injection SQL</h3>
                    <p>Exploitez la faille SQL sur DVWA.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            admin' --<br />
                            ' OR '1'='1' UNION SELECT 1,2,3
                        </div>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Scan avec OWASP ZAP</h3>
                    <p>Scannez un site vulnirable.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <p>Lancez ZAP, Quick Start, URL, Attack</p>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>Ressources</h2>
                <ul>
                    <li><a href="https://owasp.org/">OWASP</a></li>
                    <li><a href="https://portswigger.net/burp">Burp Suite</a></li>
                    <li><a href="https://www.zaproxy.org/">OWASP ZAP</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module5;