'use client';
import {useEffect,useState} from 'react';
import {LANG_META,t} from './dictionaries';
import type {LangCode} from '@/types/offer';
export const LANGS:LangCode[]=['tr','en','de','fr','ru','ar'];
export function useMtaLang(){const [lang,setLangState]=useState<LangCode>('tr'); useEffect(()=>{const saved=(localStorage.getItem('mta_preferred_lang')||'tr') as LangCode; if(LANG_META[saved]) setLangState(saved)},[]); useEffect(()=>{const meta=LANG_META[lang]; document.documentElement.lang=lang; document.documentElement.dir=meta.dir; localStorage.setItem('mta_preferred_lang',lang)},[lang]); return {lang,setLang:setLangState,meta:LANG_META[lang],T:(key:string)=>t(lang,key),langs:LANGS}}
