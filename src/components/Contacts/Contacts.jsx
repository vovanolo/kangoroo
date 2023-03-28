import insta from "./Instagram.png";
import facebook from "./Facebook.png";
import telegram from "./Telegram.png";
function Contacts(){
    
    return(
        <section id="Contacts">
        <h5 className="flex justify-center text-7xl mt-8">Контакти</h5>
        <div className="flex flex-wrap justify-between gap-y-8 container mx-auto mt-10 text-4xl p-10">
            <div className="text-center">
            <p>Для зв'язку :</p>
            <a href="tel:380679495034">+380679495034</a>
           <p>Наші соціальні мережі:</p>
            </div>
                <div className="flex justify-center">
                      <a href="https://www.instagram.com/kangaroo.sadok/"target={"_blank"}><img className="w-24 h-24" src={insta} alt="" /></a> 
                      <a href="https://www.facebook.com/profile.php?id=100011857111806"target={"_blank"}><img className="w-24 h-24 rouded-full object-contain" src={facebook} alt="" /></a>
                      <a href="https://web.telegram.org/z/#1865571356"target={"_blank"}><img className="w-24 h-24" src={telegram} alt="" /></a>
                </div>
                <div className="flex justify-center mx-auto w-full px-8">
                        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d541.593557805669!2d24.008868864224958!3d49.781031499473535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae62d92b0787b%3A0x759919484c547929!2z0LLRg9C70LjRhtGPINCG0LLQsNC90LAg0JHQvtCz0YPQvdCwLCA0LCDQodC-0LrRltC70YzQvdC40LrQuCwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA4MTEzMA!5e0!3m2!1suk!2sua!4v1680024288995!5m2!1suk!2sua" className="w-full h-96"/>
                </div>
           
        </div>
    

        </section>

        
    )
}
export default Contacts;