import React from 'react';

const Module7 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>Module 7 : Forensique et reponse a incident</h1>
                <div className="module-meta">Duree : 8 heures | Niveau : Avance</div>
            </div>

            <div className="module-section">
                <h2>7.1 Cycle de reponse a incident</h2>
                <ol>
                    <li>Preparation</li>
                    <li>Detection et analyse</li>
                    <li>Confinement et eradication</li>
                    <li>Post-incident</li>
                </ol>
            </div>

            <div className="module-section">
                <h2>7.2 Ordre de volatilite</h2>
                <ol>
                    <li>Registres, cache CPU</li>
                    <li>Memoire vive (RAM)</li>
                    <li>Disques</li>
                    <li>Logs</li>
                </ol>
            </div>

            <div className="module-section">
                <h2>7.3 Outils forensiques</h2>
                <ul>
                    <li>Volatility - analyse memoire</li>
                    <li>Autopsy - analyse disques</li>
                    <li>FTK Imager - acquisition</li>
                    <li>Ghidra - reverse engineering</li>
                </ul>
                <div className="command-box">
                    volatility -f mem.dump imageinfo<br />
                    volatility -f mem.dump pslist<br />
                    autopsy --port 9999
                </div>
            </div>

            <div className="module-section">
                <h2>7.4 Analyse de logs</h2>
                <div className="command-box">
                    journalctl -xe<br />
                    journalctl -u sshd --since today<br />
                    cat /var/log/auth.log | grep Failed
                </div>
            </div>

            <div className="module-section">
                <h2>Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Analyse memoire</h3>
                    <p>Analysez un dump memoire avec Volatility.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            volatility -f mem.dump pslist<br />
                            volatility -f mem.dump netscan
                        </div>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Investigation incident</h3>
                    <p>Trouvez les traces d une compromission.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            last<br />
                            crontab -l<br />
                            find / -mtime -1 -type f<br />
                            netstat -tunap<br />
                            history
                        </div>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>Ressources</h2>
                <ul>
                    <li><a href="https://www.volatilityfoundation.org/">Volatility</a></li>
                    <li><a href="https://www.sleuthkit.org/autopsy/">Autopsy</a></li>
                    <li><a href="https://www.virustotal.com/">VirusTotal</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module7;