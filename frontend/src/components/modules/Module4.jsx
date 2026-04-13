import React from 'react';

const Module4 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>Module 4 : Securite des systemes d exploitation</h1>
                <div className="module-meta">Duree : 6 heures | Niveau : Intermediaire</div>
            </div>

            <div className="module-section">
                <h2>4.1 Hardening Linux</h2>
                <ul>
                    <li>Desactiver les services inutiles</li>
                    <li>Restreindre SSH : cles uniquement, changer port</li>
                    <li>Mises a jour automatiques</li>
                    <li>Audit avec Lynis</li>
                </ul>
                <div className="command-box">
                    # SSH securise dans sshd_config<br />
                    PermitRootLogin no<br />
                    PasswordAuthentication no<br />
                    PubkeyAuthentication yes<br />
                    Port 2222
                </div>
            </div>

            <div className="module-section">
                <h2>4.2 Durcissement Windows</h2>
                <ul>
                    <li>UAC au niveau maximum</li>
                    <li>BitLocker pour le chiffrement</li>
                    <li>Windows Defender + Firewall</li>
                </ul>
                <div className="command-box">
                    # PowerShell securise<br />
                    Set-ExecutionPolicy Restricted<br />
                    Get-EventLog -LogName Security -Newest 50
                </div>
            </div>

            <div className="module-section">
                <h2>4.3 EDR et Antivirus</h2>
                <p>EDR : Surveillance proactive des endpoints. Solutions : CrowdStrike, SentinelOne, Microsoft Defender.</p>
            </div>

            <div className="module-section">
                <h2>4.4 Detection de rootkits</h2>
                <div className="command-box">
                    sudo apt install rkhunter<br />
                    sudo rkhunter --check --sk<br />
                    sudo apt install chkrootkit<br />
                    sudo chkrootkit
                </div>
            </div>

            <div className="module-section">
                <h2>Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Audit avec Lynis</h3>
                    <p>Installez et executez Lynis sur votre systeme.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            sudo apt install lynis<br />
                            sudo lynis audit system
                        </div>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Configuration SSH securisee</h3>
                    <p>Configurez SSH pour n accepter que les connexions par cle.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            ssh-keygen -t rsa -b 4096<br />
                            ssh-copy-id -p 2222 user@host
                        </div>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>Ressources</h2>
                <ul>
                    <li><a href="https://cisbenchmarks.org/">CIS Benchmarks</a></li>
                    <li><a href="https://github.com/CISOfy/lynis">Lynis</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module4;