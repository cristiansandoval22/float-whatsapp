/**
 * Inicializa el botón flotante de WhatsApp
 * 
 * @param {Object} params
 * @param {string} params.phone - Número local SIN prefijo internacional
 * @param {string} params.country - Código ISO-2 del país (ej: 'PE', 'MX')
 * @param {string} params.message - Mensaje prellenado en WhatsApp
 * @param {string} params.content - Texto visible en el botón
 * @param {number} params.theme - Número de tema (1–6)
 */
function initWhatsappButton({
    phone,
    country,
    message = '',
    content = 'WhatsApp',
    theme = 1
  }) {
    const countryPrefixes = {
        AF: '93', AL: '355', DZ: '213', AS: '1', AD: '376', AO: '244', AI: '1',
        AG: '1', AR: '54', AM: '374', AW: '297', AU: '61', AT: '43', AZ: '994',
        BS: '1', BH: '973', BD: '880', BB: '1', BY: '375', BE: '32', BZ: '501',
        BJ: '229', BM: '1', BT: '975', BO: '591', BA: '387', BW: '267', BR: '55',
        BN: '673', BG: '359', BF: '226', BI: '257', KH: '855', CM: '237', CA: '1',
        CV: '238', KY: '1', CF: '236', TD: '235', CL: '56', CN: '86', CO: '57',
        KM: '269', CG: '242', CD: '243', CR: '506', CI: '225', HR: '385', CU: '53',
        CY: '357', CZ: '420', DK: '45', DJ: '253', DM: '1', DO: '1', EC: '593',
        EG: '20', SV: '503', GQ: '240', ER: '291', EE: '372', ET: '251', FJ: '679',
        FI: '358', FR: '33', GA: '241', GM: '220', GE: '995', DE: '49', GH: '233',
        GR: '30', GD: '1', GT: '502', GN: '224', GW: '245', GY: '592', HT: '509',
        HN: '504', HU: '36', IS: '354', IN: '91', ID: '62', IR: '98', IQ: '964',
        IE: '353', IL: '972', IT: '39', JM: '1', JP: '81', JO: '962', KZ: '7',
        KE: '254', KI: '686', KW: '965', KG: '996', LA: '856', LV: '371', LB: '961',
        LS: '266', LR: '231', LY: '218', LI: '423', LT: '370', LU: '352', MG: '261',
        MW: '265', MY: '60', MV: '960', ML: '223', MT: '356', MH: '692', MR: '222',
        MU: '230', MX: '52', FM: '691', MD: '373', MC: '377', MN: '976', ME: '382',
        MA: '212', MZ: '258', MM: '95', NA: '264', NR: '674', NP: '977', NL: '31',
        NZ: '64', NI: '505', NE: '227', NG: '234', KP: '850', MK: '389', NO: '47',
        OM: '968', PK: '92', PW: '680', PA: '507', PG: '675', PY: '595', PE: '51',
        PH: '63', PL: '48', PT: '351', QA: '974', RO: '40', RU: '7', RW: '250',
        KN: '1', LC: '1', VC: '1', WS: '685', SM: '378', ST: '239', SA: '966',
        SN: '221', RS: '381', SC: '248', SL: '232', SG: '65', SK: '421', SI: '386',
        SB: '677', SO: '252', ZA: '27', KR: '82', SS: '211', ES: '34', LK: '94',
        SD: '249', SR: '597', SZ: '268', SE: '46', CH: '41', SY: '963', TW: '886',
        TJ: '992', TZ: '255', TH: '66', TL: '670', TG: '228', TO: '676', TT: '1',
        TN: '216', TR: '90', TM: '993', TV: '688', UG: '256', UA: '380', AE: '971',
        GB: '44', US: '1', UY: '598', UZ: '998', VU: '678', VA: '39', VE: '58',
        VN: '84', YE: '967', ZM: '260', ZW: '263'
      };
      
  
    if (!phone) {
      console.error('Debes especificar un número de teléfono local.');
      return;
    }
  
    if (!country || !countryPrefixes[country.toUpperCase()]) {
      console.error(`Debes especificar un país válido. Ej: ${Object.keys(countryPrefixes).join(', ')}`);
      return;
    }
  
    if (theme < 1 || theme > 6) {
      console.warn(`Tema inválido (${theme}). Se usará el tema 1 por defecto.`);
      theme = 1;
    }
  
    const cleanPhone = phone.replace(/\D/g, '');
    const prefix = countryPrefixes[country.toUpperCase()];
  
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${prefix}${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
  
    // Elimina el botón existente si ya hay uno
    const existing = document.getElementById('fixed-whatsapp');
    if (existing) {
      existing.remove();
    }
  
    // Crea el <a> dinámicamente
    const a = document.createElement('a');
    a.href = waUrl;
    a.target = '_blank';
    a.id = 'fixed-whatsapp';
    a.className = `fixed__whatsapp theme-${theme}`;
    a.innerHTML = `
      <svg
        class="fixed__whatsapp__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
        ></path>
      </svg>
      ${content}
    `;
  
    document.body.appendChild(a);
  
    console.log(`Botón de WhatsApp inicializado: ${waUrl}`);
  }
  