/* Enquiry form for Mujanti's offers. Plain JavaScript, no libraries.
 *
 * Any page can carry one or more forms like this; the script fills in the fields and wires them up:
 *
 *   <form data-enquiry data-offer="fpo-plan"></form>
 *   <script src="assets/enquiry.js"></script>
 *
 * Leave out data-offer to let the visitor choose. An enquiry goes to api.mujanti.com/api/enquiries, the same route the
 * app's sign-in page uses, and lands in Admin > More > Leads with source WEBSITE and the offer named in its note.
 * A hidden field catches form-filling bots: if it is filled in, nothing is sent and the visitor still sees "thank you".
 * If the server cannot be reached, the form says so and offers WhatsApp with the offer already typed.
 */
(function () {
  var API = 'https://api.mujanti.com/api/enquiries';
  var WHATSAPP = '919480356357';
  var OFFERS = {
    'fpo-plan': { name: 'FPO business plan with Board and CEO training', interest: 'TRAINING' },
    'coffee-eudr': { name: 'Coffee climate and EUDR readiness', interest: 'OTHER' },
    'field-evidence': { name: 'Field evidence and impact reports', interest: 'SURVEY' },
    'other': { name: 'Something else', interest: 'OTHER' }
  };

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in (attrs || {})) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function whatsappLink(offerName) {
    var text = 'Hello Mujanti, I would like to know more about: ' + offerName + '.';
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
  }
  function field(form, id, label, attrs, hint) {
    var wrap = el('div', { 'class': 'eq-field' });
    var lab = el('label', { 'for': id }, label);
    var input = el(attrs.rows ? 'textarea' : 'input', Object.assign({ id: id }, attrs));
    wrap.appendChild(lab);
    wrap.appendChild(input);
    if (hint) {
      var h = el('div', { 'class': 'eq-hint', id: id + '-hint' }, hint);
      input.setAttribute('aria-describedby', id + '-hint');
      wrap.appendChild(h);
    }
    form.appendChild(wrap);
    return input;
  }

  function build(form, n) {
    var fixed = OFFERS[form.getAttribute('data-offer')] ? form.getAttribute('data-offer') : '';
    var p = 'eq' + n + '-';
    form.classList.add('eq-form');
    form.setAttribute('novalidate', '');
    form.textContent = '';

    var choice = null;
    if (!fixed) {
      var wrap = el('div', { 'class': 'eq-field' });
      wrap.appendChild(el('label', { 'for': p + 'offer' }, 'What are you interested in?'));
      choice = el('select', { id: p + 'offer', name: 'offer' });
      for (var k in OFFERS) choice.appendChild(el('option', { value: k }, OFFERS[k].name));
      wrap.appendChild(choice);
      form.appendChild(wrap);
    }
    var name = field(form, p + 'name', 'Your name', { name: 'name', required: '', maxlength: '80', autocomplete: 'name' });
    var org = field(form, p + 'org', 'Organisation (FPO, company, NGO)', { name: 'organisation', required: '', maxlength: '120', autocomplete: 'organization' });
    var phone = field(form, p + 'phone', 'Mobile number', { name: 'phone', type: 'tel', required: '', maxlength: '16', autocomplete: 'tel', inputmode: 'tel' }, '10 digits. We call or WhatsApp you on this number.');
    var place = field(form, p + 'place', 'District or town (optional)', { name: 'place', maxlength: '80', autocomplete: 'address-level2' });
    var note = field(form, p + 'note', 'What would you like help with? (optional)', { name: 'note', rows: '3', maxlength: '400' });

    // The trap: people never see this field, bots fill it in.
    var trapWrap = el('div', { 'class': 'eq-trap', 'aria-hidden': 'true' });
    var trap = el('input', { type: 'text', name: 'company_website', tabindex: '-1', autocomplete: 'off' });
    trapWrap.appendChild(el('label', {}, 'Leave this empty'));
    trapWrap.appendChild(trap);
    form.appendChild(trapWrap);

    var row = el('div', { 'class': 'eq-actions' });
    var send = el('button', { type: 'submit', 'class': 'eq-send' }, 'Send enquiry');
    var wa = el('a', { 'class': 'eq-wa', target: '_blank', rel: 'noopener' }, 'Or message us on WhatsApp');
    row.appendChild(send);
    row.appendChild(wa);
    form.appendChild(row);
    var msg = el('p', { 'class': 'eq-msg', role: 'status', 'aria-live': 'polite' });
    form.appendChild(msg);
    var privacy = el('p', { 'class': 'eq-small' });
    privacy.innerHTML = 'We use these details only to reply to you. See our <a href="privacy.html">Privacy Policy</a>.';
    form.appendChild(privacy);

    function offerKey() { return fixed || (choice && choice.value) || 'other'; }
    function refreshWa() { wa.setAttribute('href', whatsappLink(OFFERS[offerKey()].name)); }
    refreshWa();
    if (choice) choice.addEventListener('change', refreshWa);

    function say(text, kind) { msg.textContent = text; msg.className = 'eq-msg' + (kind ? ' eq-' + kind : ''); }
    function digits(v) { var d = v.replace(/\D/g, ''); if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2); if (d.length === 11 && d[0] === '0') d = d.slice(1); return d; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (trap.value) { form.textContent = ''; form.appendChild(el('p', { 'class': 'eq-msg eq-ok' }, 'Thank you. We will call you within 2 working days.')); return; }
      var problem = '';
      if (!name.value.trim()) problem = 'Please give your name.';
      else if (!org.value.trim()) problem = "Please give your organisation's name.";
      else if (!/^[6-9]\d{9}$/.test(digits(phone.value))) problem = 'Please give a 10-digit mobile number.';
      if (problem) { say(problem, 'err'); return; }
      var offer = OFFERS[offerKey()];
      var text = 'Offer: ' + offer.name + '. From mujanti.com' + (location.pathname ? ' (' + location.pathname.split('/').pop() + ')' : '') + '.';
      if (note.value.trim()) text += ' ' + note.value.trim();
      send.disabled = true;
      say('Sending…');
      fetch(API, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'WEBSITE', interest: offer.interest, name: name.value.trim(), organisation: org.value.trim(),
          phone: digits(phone.value), place: place.value.trim(), note: text.slice(0, 500) })
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, body: j }; });
      }).then(function (r) {
        if (r.ok && r.body.received) {
          form.textContent = '';
          form.appendChild(el('p', { 'class': 'eq-msg eq-ok' }, 'Thank you, ' + name.value.trim().split(' ')[0] + '. We have your enquiry about "' + offer.name + '" and will call you within 2 working days.'));
          return;
        }
        say((r.body && r.body.error) || 'Your enquiry was not sent. Please try again, or message us on WhatsApp.', 'err');
        send.disabled = false;
      }).catch(function () {
        say('We could not reach our server. Please message us on WhatsApp instead. The message is already typed for you.', 'err');
        send.disabled = false;
      });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form[data-enquiry]');
    for (var i = 0; i < forms.length; i++) build(forms[i], i);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.MujantiEnquiry = { offers: OFFERS };
})();
