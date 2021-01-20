INSERT INTO HEALTH_CHECK (id, endpoint) VALUES(1, 'https://jahia.com');
INSERT INTO HEALTH_CHECK (id, endpoint) VALUES(2, 'https://jahia.com');
INSERT INTO HEALTH_CHECK (id, endpoint) VALUES(3, 'https://jahia.com');

INSERT INTO APPLICATION (id, healthCheckId, name) VALUES (1, 1, 'Jahia Cloud');
INSERT INTO APPLICATION (id, healthCheckId, name) VALUES (2, 2, 'Flexudy Website');