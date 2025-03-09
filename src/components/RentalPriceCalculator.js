import React, { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RentalCalculator() {
  
  const [hours, setHours] = useState(1);
  const [computers, setComputers] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [hourPackSavings, setHourPackSavings] = useState(0);
  const [groupSavings, setGroupSavings] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [averageHourlyRate, setAverageHourlyRate] = useState(0);
  const [pricePerUser, setPricePerUser] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [reserveErrorMessage, setReserveErrorMessage] = useState("");
  const [showReserveButton, setShowReserveButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('11:00');

  const calculateNormalPrice = () => {
    const hoursValue = hours || 0;
    const computersValue = computers || 0;
    let standardRate = hoursValue * 6500;
    let basePrice = hoursValue >= 12 ? 39000 + (hours - 12) * 6500 :
      hours >= 8 ? 33000 + (hours - 8) * 6500 :
      hours >= 6 ? 27000 + (hours - 6) * 6500 :
      hours >= 3 ? 15000 + (hours - 3) * 6500 :
      hours * 6500;
    
    let promoDiscount = standardRate - basePrice;
    let discount = computersValue >= 8 ? 0.15 :
      computers >= 6 ? 0.12 :
      computers >= 4 ? 0.10 : 0;
    
    let original = standardRate * computersValue;
    let discountedPrice = basePrice * computersValue * (1 - discount);
    let totalHourPackSavings = promoDiscount * computers;
    let totalGroupSavings = (basePrice * computers * discount);
    let totalSavings = totalHourPackSavings + totalGroupSavings;
    
    setOriginalPrice(original);
    setHourPackSavings(totalHourPackSavings);
    setGroupSavings(totalGroupSavings);
    setTotalPrice(discountedPrice);
    setTotalDiscount(totalHourPackSavings + totalGroupSavings);
    setAverageHourlyRate(hours > 0 && computers > 0 ? discountedPrice / (hours * computers) : 0);
    setPricePerUser(computers > 0 ? discountedPrice / computers : 0);
    setShowReserveButton(true);

    if (computers > 0 && computers < 4) {
      setDiscountMessage(`Agrega ${4 - computers} computadoras más para acceder al descuento por grupo.`);
    } else {
      setDiscountMessage("");
    }
  };

  const handleReserve = () => {
    if (!selectedDate) {
      setReserveErrorMessage("❌ Falta seleccionar la fecha de reserva");
      return;
    }
    if (!selectedTime) {
      setReserveErrorMessage("❌ Falta configurar fecha y hora de reserva");
      return;
    }
    if (!selectedDate) return;
    const phoneNumber = "5491135143608";
    const formattedDate = selectedDate ? `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}` : '';
    const message = `Hola quiero reservar ${computers} computadoras por ${hours} horas el día ${formattedDate} a las ${selectedTime}.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4 bg-white min-h-screen text-black font-['Kanit']">
      <div className="flex flex-col items-center w-full mt-4">
        <img src="/logo-armada.png" alt="Armada Logo" className="w-32 h-32 mb-4" />
      </div>
      <Card className="w-96 p-4 bg-white border border-black rounded-lg shadow-lg">
        <CardContent className="flex flex-col gap-2">
          <label className="text-black text-lg">Cuántas horas quieres alquilar?</label>
          <select value={hours} onChange={(e) => setHours(parseInt(e.target.value) || 1)} className="text-black border p-2 rounded-md">
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 1;
              return <option key={hour} value={hour}>{hour} {hour === 1 ? 'hora' : 'horas'}</option>;
            })}
          </select>
          <label className="text-black text-lg">Cuántas computadoras quieres alquilar?</label>
          <select value={computers} onChange={(e) => setComputers(parseInt(e.target.value) || 1)} className="text-black border p-2 rounded-md">
            {Array.from({ length: 10 }, (_, i) => {
              const computer = i + 1;
              return <option key={computer} value={computer}>{computer} {computer === 1 ? 'computadora' : 'computadoras'}</option>;
            })}
          </select>
          <Button onClick={calculateNormalPrice} className="mt-2 bg-gray-800 text-white font-bold hover:bg-gray-600">Calcular Precio</Button>
        </CardContent>
      </Card>
      {totalPrice > 0 && (
        <Card className="w-96 p-4 bg-white border border-black rounded-lg shadow-lg mt-4">
          <CardContent className="flex flex-col gap-2 text-center">
            <label className="text-black text-lg">Selecciona Fecha y Hora</label>
            <Input type="date" onChange={(e) => setSelectedDate(new Date(e.target.value))} className="text-black" />
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="text-black border p-2 rounded-md">
              {Array.from({ length: 13 }, (_, i) => {
                const hour = i + 11;
                const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                return <option key={hour} value={formattedHour}>{formattedHour}</option>;
              })}
            </select>
          </CardContent>
        </Card>
      )}
      
      <Card className="w-96 p-4 bg-white border border-black rounded-lg shadow-lg mt-4">
        <CardContent className="flex flex-col gap-2 text-center">
          <h3 className="text-lg font-medium text-black">Precio Original: <span className="font-bold">${originalPrice.toLocaleString()}</span></h3>
          <h3 className="text-md text-green-600 font-bold">Descuento por Pack de horas: ${hourPackSavings.toLocaleString()}</h3>
          {hourPackSavings === 0 && totalPrice > 0 && <h3 className="text-md text-[#F28702]">No tienes descuento por pack de horas. Próxima mejora: {hours < 3 ? '3 horas (Pack por 5.000)' : hours < 6 ? '6 horas (Pack por $27.000)' : hours < 8 ? '8 horas (Pack por $33.000)' : hours < 12 ? '12 horas (Pack por $39.000)' : ''}.</h3>}
          <h3 className="text-md text-green-600 font-bold">Descuento por cantidad de usuarios: ${groupSavings.toLocaleString()}</h3>
          {discountMessage && <h3 className="text-md text-[#F28702]">{discountMessage}</h3>}
          
          <h3 className="text-md text-green-600 font-bold">Descuento Total: ${totalDiscount.toLocaleString()}</h3>
          <h2 className="text-3xl font-extrabold mt-4 text-yellow-300 bg-black p-3 rounded-lg shadow-lg">Precio Final: ${totalPrice.toLocaleString()}</h2>
        </CardContent>
      </Card>
      
      <h3 className="text-md text-green-600 font-bold">Estas pagando ${averageHourlyRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por hora</h3>
      <h3 className="text-md text-green-600 font-bold">Estas pagando ${pricePerUser.toLocaleString()} por usuario</h3>
      
      {reserveErrorMessage && <h3 className="text-md text-red-600 font-bold text-right mt-2">{reserveErrorMessage}</h3>}


        <Button onClick={() => { setHours(1); setComputers(1); setTotalPrice(0); setOriginalPrice(0);
setTotalDiscount(0); setHourPackSavings(0); setGroupSavings(0); setAverageHourlyRate(0); setPricePerUser(0); setDiscountMessage(''); setShowReserveButton(false); setReserveErrorMessage(''); setSelectedDate(null); setSelectedTime('11:00'); }} className="mt-4 bg-gray-700 hover:bg-gray-500 p-2 rounded-lg font-bold text-white">Reiniciar calculadora</Button>
        {showReserveButton && <Button onClick={handleReserve} className="mt-4 bg-green-600 hover:bg-green-500 p-2 rounded-lg font-bold text-white">Reservar Turno</Button>}
      </div>
  );
}
