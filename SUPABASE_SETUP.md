# Configuration Supabase pour Simone Perling

## Étape 1 : Créer un compte Supabase

1. Allez sur https://supabase.com
2. Créez un compte gratuit
3. Créez un nouveau projet

## Étape 2 : Créer la table "bags"

Dans le tableau de bord Supabase :

1. Allez dans "Table Editor"
2. Cliquez sur "Create a new table"
3. Nommez la table : `bags`
4. Ajoutez les colonnes suivantes :
   - `id` (text, primary key)
   - `name` (text)
   - `price` (text)
   - `comment` (text)
   - `image` (text)
   - `created_at` (timestamp with time zone, default: now())

5. Cliquez sur "Save"

## Étape 3 : Configurer les politiques RLS (Row Level Security)

1. Allez dans "Authentication" > "Policies"
2. Pour la table `bags`, désactivez RLS ou créez une politique qui permet tout accès
3. Pour un site simple, vous pouvez désactiver RLS complètement

## Étape 4 : Obtenir les clés API

1. Allez dans "Project Settings" > "API"
2. Copiez :
   - `Project URL` → sera `VITE_SUPABASE_URL`
   - `anon public` key → sera `VITE_SUPABASE_ANON_KEY`

## Étape 5 : Configurer les variables d'environnement

### En local (développement) :

Créez un fichier `.env.local` à la racine du projet :

```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon
```

### Sur Vercel (production) :

1. Allez dans votre projet Vercel
2. Allez dans "Settings" > "Environment Variables"
3. Ajoutez les variables :
   - `VITE_SUPABASE_URL` = votre URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = votre clé anon
4. Appliquez-les pour Production, Preview et Development

## Étape 6 : Tester

1. Redémarrez votre serveur de développement
2. Allez sur la page `/admin`
3. Connectez-vous avec le mot de passe : `simone2026`
4. Ajoutez quelques sacs
5. Vérifiez qu'ils apparaissent sur la page `/collection`

## Avantages de cette solution :

- ✅ Base de données partagée entre tous les utilisateurs
- ✅ Pas de limitation de stockage (comme avec localStorage)
- ✅ Les données persistent même si l'utilisateur change de navigateur
- ✅ Interface d'administration fonctionnelle
- ✅ Gratuit pour les petits projets (500MB de stockage)
- ✅ Facile à étendre avec d'autres fonctionnalités
