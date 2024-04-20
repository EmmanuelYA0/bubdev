import React from 'react'

export default function Vins() {
  return (
    <>
   {/* className='mt-48' */}
    <h1 className="Produits_texte"><i><b>Nos meilleurs vins pour votre plaisir</b></i></h1>
       <section className="section_produits"> 
            <div className="produits">

                <div className="carte">
                    <div className="img"><img src="vin1.jpg"/></div>
                    <button className="img"><a href="vin1.jpg">voir plus</a></button>
                    <div className="desc">Chateau Margaux premier grand cru classNameé</div>
                    <div className="titre">ChATEAU MARGAUX</div>
                    <div className="box">
                        <div className="prix">35000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
                <div className="carte">
                    <div className="img"><img src="vin2.jpg"/></div>
                    <div className="desc">Opus one</div>
                    <div className="titre">OPUS ONE</div>
                    <div className="box">
                        <div className="prix">35000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
                <div className="carte">
                    <div className="img"><img src="vin3.jpg"/></div>
                    <div className="desc">Romanée-conti</div>
                    <div className="titre">ROMANEE-CONTI</div>
                    <div className="box">
                        <div className="prix">38000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
                
                <div className="carte">
                    <div className="img"><img src="vin4.jpg"/></div>
                    <div className="desc">Screaming Eagle </div>
                    <div className="titre">SCREAMING EAGLE</div>
                    <div className="box">
                        <div className="prix">55000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
                
                <div className="carte">
                    <div className="img"><img src="vin5.jpg"/></div>
                    <div className="desc">Penfolds Grange vintage 2016</div>
                    <div className="titre">PENFOLDS GRANGE</div>
                    <div className="box">
                        <div className="prix">40000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
                
                <div className="carte">
                    <div className="img"><img src="vin6.jpg"/></div>
                    <div className="desc">Vega Sicilia Unico Ribera del Duero, Espagne depuis 2003</div>
                    <div className="titre">VEGA SICILIA UNICO</div>
                    <div className="box">
                        <div className="prix">40000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
      
                <div className="carte">
                    <div className="img"><img src="vin7.jpg"/></div>
                    <div className="desc">Sassicaia de Toscane en Italie</div>
                    <div className="titre">SASSICAIA</div>
                    <div className="box">
                        <div className="prix">36000fcfa</div>
                        <button className="achat"><a href="Panier.html">Acheter</a></button>

                    </div>
                </div>          
            
      

            </div>
            
       </section>
    </>
  )
}
