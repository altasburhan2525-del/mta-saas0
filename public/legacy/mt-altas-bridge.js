(function(){
  function ready(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function getParams(){
    return new URLSearchParams(window.location.search || '');
  }

  ready(function(){
    var params = getParams();
    var root = document.getElementById('mta11-smart-calc-root');
    if(!root) return;

    var dealer = params.get('dealer') || 'mt-altas';
    var name = params.get('name') || 'MT Altaş İnşaat';
    var phone = params.get('phone') || '905426174956';
    var color = params.get('color') || '#d83939';
    var vat = params.get('vat') || '0.20';

    root.setAttribute('data-dealer', dealer);
    root.setAttribute('data-dealer-name', name);
    root.setAttribute('data-dealer-phone', phone);
    root.setAttribute('data-mta-vat-rate', vat);

    var css = document.createElement('style');
    css.setAttribute('data-mt-altas-bridge', 'dealer-theme');
    css.textContent = '#mta11-smart-calc-root{--red:'+color+'!important} #mta11-smart-calc-root .mta-btn{background:linear-gradient(180deg,'+color+',#b82424)!important}';
    document.head.appendChild(css);

    var title = document.querySelector('#mta11-smart-calc-root .mta-title');
    if(title && name) title.textContent = name + ' Hesaplayıcı';

    window.MT_ALTAS_DEALER = { dealer:dealer, name:name, phone:phone, color:color, vat:vat };
  });
})();
