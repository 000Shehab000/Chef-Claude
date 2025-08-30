# 🚀 Setup Guide for TasteGPT

## 🔑 API Key Configuration

To use TasteGPT, you need to set up your Hugging Face API key:

### 1. Get Your Hugging Face API Key

- Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
- Click "New token"
- Give it a name (e.g., "TasteGPT")
- Select "Read" permissions
- Copy the generated token

### 2. Create Environment File

In the `app` directory, create a file named `.env`:

```bash
# Create .env file in the app directory
touch .env
```

### 3. Add Your API Key

Open the `.env` file and add:

```env
REACT_APP_HF_ACCESS_TOKEN=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with the token you copied from Hugging Face.

### 4. Restart Your Development Server

After adding the `.env` file, restart your React app:

```bash
npm start
```

## 🐛 Troubleshooting

### "API key not configured" Error

- Make sure you created the `.env` file in the `app` directory
- Check that the variable name is exactly `REACT_APP_HF_ACCESS_TOKEN`
- Ensure there are no spaces around the `=` sign
- Restart your development server after making changes

### "Authentication failed" Error

- Verify your API key is correct
- Check if your Hugging Face account is active
- Ensure you have sufficient API credits/quota

### "Rate limit exceeded" Error

- Wait a few minutes before trying again
- Hugging Face has rate limits for free accounts

## 📝 Example .env File

```env
REACT_APP_HF_ACCESS_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔒 Security Note

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Keep your API keys private and secure

