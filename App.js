import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

export default function App() {
  const [price, setPrice] = useState(2674.83);
  const [balance, setBalance] = useState(2677.07);
  const [signal, setSignal] = useState('SELL');
  const [auto, setAuto] = useState(false);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => Number((p + (Math.random()-0.5)*2).toFixed(2)));
      setSignal(Math.random()>0.5?'BUY':'SELL');
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const trade = (t) => {
    setTrades([`${new Date().toLocaleTimeString()} ${t} ${price}`, ...trades].slice(0,5));
    setBalance(b=>b+(t==='SELL'?1.5:-1.5));
  };

  return (
    <ScrollView style={s.c}>
      <Text style={s.t}>XAU MASTER BOT</Text>
      <Text style={s.sub}>Kayole Edition - Ready!</Text>
      <View style={s.card}>
        <Text style={s.p}>${price} XAU/USD</Text>
        <Text style={s.l}>Balance: ${balance.toFixed(2)}</Text>
        <Text style={s.sig}>{signal}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.l}>AUTO BOT: {auto?'ON':'OFF'}</Text>
        <Switch value={auto} onValueChange={setAuto}/>
      </View>
      <View style={s.btnRow}>
        <TouchableOpacity style={[s.btn,s.buy]} onPress={()=>trade('BUY')}><Text style={s.bt}>BUY</Text></TouchableOpacity>
        <TouchableOpacity style={[s.btn,s.sell]} onPress={()=>trade('SELL')}><Text style={s.bt}>SELL</Text></TouchableOpacity>
      </View>
      <View style={s.card}>
        {trades.map((x,i)=><Text key={i} style={s.tr}>{x}</Text>)}
      </View>
    </ScrollView>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:'#0a0a0a',padding:20,paddingTop:50},
  t:{color:'#FFD700',fontSize:24,fontWeight:'bold',textAlign:'center'},
  sub:{color:'#fff',textAlign:'center',marginBottom:20},
  card:{backgroundColor:'#1a1a1a',padding:15,borderRadius:12,marginBottom:15},
  p:{color:'#fff',fontSize:22,fontWeight:'bold',textAlign:'center'},
  l:{color:'#aaa',marginTop:5},
  sig:{color:'#ff4444',fontSize:22,fontWeight:'bold',textAlign:'center',marginTop:10},
  row:{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#1a1a1a',padding:15,borderRadius:12,marginBottom:15},
  btnRow:{flexDirection:'row',justifyContent:'space-around'},
  btn:{padding:15,borderRadius:10,width:120,alignItems:'center'},
  buy:{backgroundColor:'#00aa66'},sell:{backgroundColor:'#cc3333'},
  bt:{color:'#fff',fontWeight:'bold'},tr:{color:'#888',fontSize:12,marginTop:3}
});
