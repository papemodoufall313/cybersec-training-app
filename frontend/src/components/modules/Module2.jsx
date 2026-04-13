import React from 'react';

const Module2 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>ðŸŒ Module 2 : SÃ©curitÃ© rÃ©seau</h1>
                <div className="module-meta">â±ï¸ DurÃ©e : 8 heures | ðŸŽ¯ Niveau : IntermÃ©diaire</div>
            </div>

            <div className="module-section">
                <h2>2.1 ModÃ¨le OSI et sÃ©curitÃ© par couche</h2>
                <ul>
                    <li><strong>Couche 1 (Physique) :</strong> Protection des cÃ¢bles, Faraday cages</li>
                    <li><strong>Couche 2 (Liaison) :</strong> MAC filtering, 802.1X, ARP spoofing prevention</li>
                    <li><strong>Couche 3 (RÃ©seau) :</strong> Firewalls, VPN, IPSec</li>
                    <li><strong>Couche 4 (Transport) :</strong> TLS, TCP wrappers</li>
                    <li><strong>Couche 7 (Application) :</strong> WAF, authentification forte</li>
                </ul>
            </div>

            <div className="module-section">
                <h2>2.2 Firewalls (Pare-feux)</h2>
                <p><strong>Types :</strong></p>
                <ul>
                    <li><strong>Filtrage paquet :</strong> Analyse en-tÃªtes (IP, port, protocole)</li>
                    <li><strong>Ã‰tatique (Stateful) :</strong> Maintient l'Ã©tat des connexions</li>
                    <li><strong>Proxy / Next-Gen :</strong> Inspection applicative (WAF)</li>
                </ul>
                <div className="command-box">
                    # Configuration iptables (Linux)<br />
                    iptables -P INPUT DROP<br />
                    iptables -A INPUT -p tcp --dport 22 -j ACCEPT<br />
                    iptables -A INPUT -p tcp --dport 80 -j ACCEPT<br />
                    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
                </div>
            </div>

            <div className="module-section">
                <h2>2.3 IDS/IPS (Snort/Suricata)</h2>
                <p><strong>IDS :</strong> DÃ©tecte et alerte | <strong>IPS :</strong> DÃ©tecte et bloque</p>
                <div className="command-box">
                    # Installation et test Snort<br />
                    sudo apt install snort<br />
                    sudo snort -A console -c /etc/snort/snort.conf<br />
                    # GÃ©nÃ©rer une alerte : nmap -sS target
                </div>
            </div>

            <div className="module-section">
                <h2>2.4 VPN (WireGuard, OpenVPN, IPSec)</h2>
                <div className="command-box">
                    # Configuration WireGuard<br />
                    [Interface]<br />
                    PrivateKey = xxxxx<br />
                    Address = 10.0.0.1/24<br /><br />
                    [Peer]<br />
                    PublicKey = yyyyy<br />
                    AllowedIPs = 10.0.0.2/32
                </div>
            </div>

            <div className="module-section">
                <h2>ðŸ“ Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Configuration iptables</h3>
                    <p>Configurez un pare-feu qui bloque tous les ports sauf SSH, HTTP et HTTPS.</p>
                    <details>
                        <summary>ðŸ” Voir la solution</summary>
                        <div className="command-box">
                            iptables -P INPUT DROP<br />
                            iptables -A INPUT -p tcp --dport 22 -j ACCEPT<br />
                            iptables -A INPUT -p tcp --dport 80 -j ACCEPT<br />
                            iptables -A INPUT -p tcp --dport 443 -j ACCEPT<br />
                            iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
                        </div>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Scan rÃ©seau avec Nmap</h3>
                    <p>Scannez une cible pour dÃ©couvrir les services ouverts.</p>
                    <div className="command-box">nmap -sV -sC -p- 192.168.1.1</div>
                    <details>
                        <summary>ðŸ” Explication des flags</summary>
                        <p>-sV : DÃ©tection de version<br />-sC : Scripts par dÃ©faut<br />-p- : Tous les ports (1-65535)</p>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 3 : Capture et analyse Wireshark</h3>
                    <p>Capturer une conversation HTTP et extraire les donnÃ©es sensibles.</p>
                    <details>
                        <summary>ðŸ” Solution</summary>
                        <p>Filtre : http.request.method == "POST"<br />Suivre le flux TCP â†’ Extraire les paramÃ¨tres</p>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>ðŸ“š Ressources</h2>
                <ul className="resources-list">
                    <li><a href="https://www.wireshark.org/" target="_blank">Wireshark - Analyseur de paquets</a></li>
                    <li><a href="https://nmap.org/" target="_blank">Nmap - Scanner rÃ©seau</a></li>
                    <li><a href="https://www.snort.org/" target="_blank">Snort - IDS/IPS Open Source</a></li>
                    <li><a href="https://www.wireguard.com/" target="_blank">WireGuard - VPN moderne</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module2;