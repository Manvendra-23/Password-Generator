 // DOM Elements
    const passwordDisplay = document.getElementById('passwordDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const copyMessage = document.getElementById('copyMessage');
    const lengthDisplay = document.getElementById('lengthDisplay');
    const lengthSlider = document.getElementById('lengthSlider');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const generateBtn = document.getElementById('generateBtn');
    const strengthText = document.getElementById('strengthText');
    const strengthBars = [
      document.getElementById('bar1'),
      document.getElementById('bar2'),
      document.getElementById('bar3'),
      document.getElementById('bar4')
    ];

    // Password character sets
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      generatePassword();
      updateStrengthIndicator();
    });

    // Update length display
    lengthSlider.addEventListener('input', () => {
      lengthDisplay.textContent = lengthSlider.value;
      generatePassword();
    });

    // Copy password to clipboard
    copyBtn.addEventListener('click', () => {
      if (passwordDisplay.value) {
        navigator.clipboard.writeText(passwordDisplay.value)
          .then(() => {
            copyMessage.classList.add('active');
            setTimeout(() => {
              copyMessage.classList.remove('active');
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
      }
    });

    // Generate password when options change
    [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        generatePassword();
      });
    });

    // Generate password button
    generateBtn.addEventListener('click', generatePassword);

    // Generate password function
    function generatePassword() {
      const length = parseInt(lengthSlider.value);
      const includeUppercase = uppercaseCheckbox.checked;
      const includeLowercase = lowercaseCheckbox.checked;
      const includeNumbers = numbersCheckbox.checked;
      const includeSymbols = symbolsCheckbox.checked;
      
      let charSet = '';
      let password = '';
      
      if (includeUppercase) charSet += uppercaseLetters;
      if (includeLowercase) charSet += lowercaseLetters;
      if (includeNumbers) charSet += numbers;
      if (includeSymbols) charSet += symbols;
      
      // If no character set is selected, default to lowercase
      if (charSet.length === 0) {
        charSet = lowercaseLetters;
        lowercaseCheckbox.checked = true;
      }
      
      // Generate password
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
      }
      
      passwordDisplay.value = password;
      updateStrengthIndicator();
    }

    // Update password strength indicator
    function updateStrengthIndicator() {
      const length = parseInt(lengthSlider.value);
      const includeUppercase = uppercaseCheckbox.checked;
      const includeLowercase = lowercaseCheckbox.checked;
      const includeNumbers = numbersCheckbox.checked;
      const includeSymbols = symbolsCheckbox.checked;
      
      // Calculate strength score (0-100)
      let score = 0;
      
      // Length contributes up to 50 points
      score += Math.min(50, length * 2);
      
      // Character variety contributes up to 50 points
      let varietyCount = 0;
      if (includeUppercase) varietyCount++;
      if (includeLowercase) varietyCount++;
      if (includeNumbers) varietyCount++;
      if (includeSymbols) varietyCount++;
      
      score += varietyCount * 12.5;
      
      // Determine strength level
      let strengthLevel;
      let strengthLabel;
      
      if (score < 30) {
        strengthLevel = 1;
        strengthLabel = "WEAK";
      } else if (score < 60) {
        strengthLevel = 2;
        strengthLabel = "MEDIUM";
      } else if (score < 80) {
        strengthLevel = 3;
        strengthLabel = "STRONG";
      } else {
        strengthLevel = 4;
        strengthLabel = "VERY STRONG";
      }
      
      // Update UI
      strengthText.textContent = strengthLabel;
      
      // Update strength bars
      strengthBars.forEach((bar, index) => {
        bar.classList.remove('active', 'medium', 'strong');
        
        if (index < strengthLevel) {
          bar.classList.add('active');
          
          if (strengthLevel === 2) bar.classList.add('medium');
          if (strengthLevel === 3) bar.classList.add('strong');
          if (strengthLevel === 4) bar.classList.add('strong');
        }
      });
    }