export default function EmbedPage(){
  return (
    <main style={{padding:24,fontFamily:'Arial'}}>
      <h1>MT Altaş Hesaplayıcı - Embed</h1>
      <p>Başka sitelerde kullanmak için aşağıdaki kodu ekleyin:</p>
      <pre style={{background:'#111',color:'#0f0',padding:16,borderRadius:12}}>
{`<div id="mt-altas-hesaplayici"></div>
<script src="https://app.mtaltasinsaat.com/embed/mt-altas-hesaplayici.js" data-dealer="demo"></script>`}
      </pre>
    </main>
  );
}
