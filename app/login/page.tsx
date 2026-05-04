'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    setError('');
    const res = await fetch('/api/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json();

    if(!data.ok){
      setError(data.message);
      return;
    }

    localStorage.setItem('mt_user', JSON.stringify(data.user));
    router.push('/dashboard');
  };

  return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f1724',color:'#fff'}}>
      <div style={{background:'#1b2433',padding:30,borderRadius:20,width:320}}>
        <h2>Giriş Yap</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={input} />
        {error && <div style={{color:'#ff6b6b'}}>{error}</div>}
        <button onClick={login} style={btn}>Giriş</button>
        <p style={{fontSize:12,marginTop:10,color:'#aaa'}}>Demo: admin@mtaltas.local</p>
      </div>
    </main>
  );
}

const input = {width:'100%',height:44,marginTop:10,borderRadius:10,padding:'0 10px'};
const btn = {width:'100%',height:44,marginTop:12,borderRadius:10,background:'#d83939',color:'#fff',border:0,fontWeight:900};
