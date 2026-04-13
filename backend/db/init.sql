-- Création de la base de données
CREATE DATABASE IF NOT EXISTS cybersec_training;

\c cybersec_training;

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des modules
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    duration_hours INT,
    order_position INT NOT NULL
);

-- Table des exercices
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    module_id INT REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    instructions TEXT,
    command_example TEXT,
    expected_output TEXT,
    order_position INT NOT NULL
);

-- Table des challenges CTF
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- web, network, crypto, forensic, binary
    difficulty INT CHECK (difficulty BETWEEN 1 AND 5),
    flag VARCHAR(255) NOT NULL,
    points INT DEFAULT 100,
    docker_image VARCHAR(100),
    docker_port INT
);

-- Table de progression
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    UNIQUE(user_id, exercise_id)
);

-- Table des flags validés
CREATE TABLE user_flags (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    challenge_id INT REFERENCES challenges(id) ON DELETE CASCADE,
    validated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, challenge_id)
);

-- Insertion des données de formation
INSERT INTO modules (title, description, duration_hours, order_position) VALUES
('Introduction à la cybersécurité', 'Concepts fondamentaux : CIA, menaces, risques', 4, 1),
('Sécurité réseau', 'Firewalls, IDS/IPS, VPN, protocoles sécurisés', 8, 2),
('Cryptographie appliquée', 'Chiffrement, hachage, PKI, signatures', 6, 3),
('Sécurité des systèmes', 'Linux/Windows hardening, EDR, audit', 6, 4),
('Sécurité des applications web', 'OWASP Top 10, injection SQL, XSS', 8, 5),
('Tests d''intrusion', 'Pentest, Metasploit, élévation de privilèges', 10, 6),
('Forensique et réponse à incident', 'Analyse mémoire, disque, logs', 8, 7);

-- Insertion des exercices (exemples)
INSERT INTO exercises (module_id, title, description, instructions, command_example, expected_output, order_position) VALUES
(1, 'Analyse de risque', 'Identifier les actifs et menaces', 'Analysez le cas d''attaque SolarWinds', 'nmap -sV target.com', 'Ports ouverts découverts', 1),
(2, 'Configuration iptables', 'Configurer un pare-feu basique', 'Bloquez tout sauf SSH et HTTP', 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT', 'Règles appliquées', 1),
(2, 'Détection d''intrusion avec Snort', 'Installer et configurer Snort', 'Générer une alerte sur scan Nmap', 'snort -A console -c /etc/snort/snort.conf', 'Alerte générée', 2),
(3, 'Chiffrement AES avec OpenSSL', 'Chiffrer/déchiffrer un fichier', 'Utiliser openssl pour chiffrer secret.txt', 'openssl enc -aes-256-cbc -in secret.txt -out secret.enc', 'Fichier chiffré créé', 1);

-- Insertion des challenges CTF
INSERT INTO challenges (title, description, category, difficulty, flag, points, docker_image, docker_port) VALUES
('SQL Injection basique', 'Contournez l''authentification sur login.php', 'web', 1, 'FLAG{sql_injection_ez}', 100, 'vulnerables/web-dvwa', 80),
('Capture FTP', 'Analysez capture.pcap pour trouver le mot de passe FTP', 'network', 2, 'FLAG{ftp_1s_insecure}', 150, NULL, NULL),
('MD5 Crack', 'Cassez le hash 5f4dcc3b5aa765d61d8327deb882cf99', 'crypto', 1, 'FLAG{md5_is_broken}', 100, NULL, NULL),
('Reverse Engineering', 'Trouvez le mot de passe dans crackme.bin', 'binary', 3, 'FLAG{revers1ng_1s_fun}', 200, 'crackme/challenge', 1337);