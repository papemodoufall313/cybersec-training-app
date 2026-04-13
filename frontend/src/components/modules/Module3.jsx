import React from 'react';

const Module3 = () => {
    return (
        <div className="module-content">
            <div className="module-header">
                <h1>Module 3 : Cryptographie appliquée</h1>
                <div className="module-meta">Durée : 6 heures | Niveau : Intermédiaire</div>
            </div>

            <div className="module-section">
                <h2>3.1 Concepts fondamentaux</h2>
                <ul>
                    <li>Chiffrement symétrique : même clé (AES)</li>
                    <li>Chiffrement asymétrique : paire clé publique/privée (RSA)</li>
                    <li>Hachage : fonction à sens unique (SHA-256)</li>
                    <li>Signature numérique : preuve d'authenticité</li>
                </ul>
            </div>

            <div className="module-section">
                <h2>3.2 Chiffrement AES</h2>
                <div className="command-box">
                    openssl enc -aes-256-cbc -salt -in secret.txt -out secret.enc -k password<br />
                    openssl enc -d -aes-256-cbc -in secret.enc -out secret.txt -k password
                </div>
            </div>

            <div className="module-section">
                <h2>3.3 Chiffrement RSA</h2>
                <div className="command-box">
                    openssl genrsa -out private.pem 2048<br />
                    openssl rsa -in private.pem -pubout -out public.pem<br />
                    openssl rsautl -encrypt -inkey public.pem -pubin -in message.txt -out message.enc
                </div>
            </div>

            <div className="module-section">
                <h2>3.4 Hachage</h2>
                <div className="command-box">
                    sha256sum fichier.txt<br />
                    echo "hash_attendu fichier.txt" | sha256sum -c
                </div>
            </div>

            <div className="module-section">
                <h2>Exercices pratiques</h2>
                
                <div className="exercise-box">
                    <h3>Exercice 1 : Chiffrement AES</h3>
                    <p>Chiffrez et déchiffrez un message avec AES-256.</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <div className="command-box">
                            echo "Message secret" {`>`} msg.txt<br />
                            openssl enc -aes-256-cbc -in msg.txt -out msg.enc -k pass<br />
                            openssl enc -d -aes-256-cbc -in msg.enc -out msg_dec.txt -k pass<br />
                            cat msg_dec.txt
                        </div>
                    </details>
                </div>

                <div className="exercise-box">
                    <h3>Exercice 2 : Casser un hash MD5</h3>
                    <p>Hash : 5f4dcc3b5aa765d61d8327deb882cf99</p>
                    <details>
                        <summary>Voir la solution</summary>
                        <p>Le hash correspond à "password"</p>
                    </details>
                </div>
            </div>

            <div className="module-section">
                <h2>Ressources</h2>
                <ul>
                    <li><a href="https://www.cryptool.org/">CrypTool</a></li>
                    <li><a href="https://cryptography.io/">Cryptography.io</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Module3;