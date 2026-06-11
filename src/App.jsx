import { useMemo, useState } from 'react'
import './App.css'

const countries = ['All Countries', 'South Africa', 'Namibia', 'Zimbabwe', 'Botswana', 'Zambia', 'Mozambique']

const animals = [
  'Aardwolf', 'Baboon', 'Black Wildebeest', 'Blessbuck', 'Blue Duiker',
  'Blue Wildebeest', 'Bontebok', 'Bushbuck', 'Bushpig', 'Cape Buffalo',
  'Caracal', 'Common Duiker', 'Crocodile', 'Eland', 'Fallow Deer',
  'Gemsbok', 'Giraffe', 'Hippo', 'Impala', 'Jackal', 'Klipspringer',
  'Kudu', 'Lechwe', 'Leopard', 'Lion', 'Mountain Reedbuck', 'Nyala',
  'Ostrich', 'Porcupine', 'Red Hartebeest', 'Reedbuck', 'Roan Antelope',
  'Sable Antelope', 'Springbok', 'Steenbok', 'Tsessebe', 'Warthog',
  'Waterbuck', 'White Blesbuck', 'Zebra'
]

const farms = [
  {
    id: 1,
    name: 'Bushveld Trophy Lodge',
    country: 'South Africa',
    flag: '🇿🇦',
    area: 'Limpopo',
    rating: 4.9,
    days: 6,
    price: 3250,
    animals: ['Kudu', 'Hippo', 'Impala', 'Zebra', 'Warthog', 'Waterbuck', 'Nyala', 'Blue Wildebeest'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Zambezi Valley Big Game',
    country: 'Zimbabwe',
    flag: '🇿🇼',
    area: 'Zambezi Valley',
    rating: 4.9,
    days: 10,
    price: 7400,
    animals: ['Kudu', 'Hippo', 'Cape Buffalo', 'Crocodile', 'Impala', 'Warthog'],
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Namib Desert Safari Hunts',
    country: 'Namibia',
    flag: '🇳🇦',
    area: 'Central Namibia',
    rating: 4.8,
    days: 8,
    price: 3900,
    animals: ['Kudu', 'Gemsbok', 'Springbok', 'Warthog', 'Zebra', 'Eland'],
    image: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Kalahari Plains Safaris',
    country: 'South Africa',
    flag: '🇿🇦',
    area: 'Northern Cape',
    rating: 4.7,
    days: 7,
    price: 2850,
    animals: ['Springbok', 'Gemsbok', 'Kudu', 'Warthog', 'Red Hartebeest', 'Ostrich'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
]

function App() {
  const [tab, setTab] = useState('hunters')
  const [country, setCountry] = useState('All Countries')
  const [selectedAnimals, setSelectedAnimals] = useState(['Kudu', 'Hippo'])
  const [selectedFarm, setSelectedFarm] = useState(farms[0])

  const matchingFarms = useMemo(() => {
    return farms.filter((farm) => {
      const countryMatch = country === 'All Countries' || farm.country === country
      const animalMatch = selectedAnimals.every((animal) => farm.animals.includes(animal))
      return countryMatch && animalMatch
    })
  }, [country, selectedAnimals])

  function toggleAnimal(animal) {
    setSelectedAnimals((prev) =>
      prev.includes(animal)
        ? prev.filter((item) => item !== animal)
        : [...prev, animal]
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <img src="/logo.png" alt="SafariConnect" className="logo" />

        <div className="nav-buttons">
          <button onClick={() => setTab('hunters')}>Hunters</button>
          <button onClick={() => setTab('planner')}>Hunt Planner</button>
          <button onClick={() => setTab('permits')}>Permit Centre</button>
          <button onClick={() => setTab('farms')}>Farms</button>
          <button onClick={() => setTab('login')}>Login</button>
          <button onClick={() => setTab('admin')}>Admin</button>
        </div>
      </nav>

      <section className="hero">
        <h1>SafariConnect</h1>
        <p>Africa's premier hunting marketplace connecting international hunters with trusted outfitters.</p>
        <button onClick={() => setTab('hunters')}>Find a Hunt</button>
        <button onClick={() => setTab('farms')}>Add Your Farm</button>
      </section>

      <section className="trust">
        <span>✓ Verified Outfitters</span>
        <span>✓ Permit Assistance</span>
        <span>✓ Airport Transfers</span>
        <span>✓ Taxidermy Coordination</span>
        <span>✓ Secure Booking Requests</span>
      </section>

      {tab === 'hunters' && (
        <main>
          <section className="panel">
            <h2>Search Hunts</h2>

            <label>Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              {countries.map((item) => <option key={item}>{item}</option>)}
            </select>

            <h2>Choose Animals</h2>
            <p className="small-text">Select more than one animal. SafariConnect will only show farms that can offer all selected animals.</p>

            <div className="animal-grid">
              {animals.map((animal) => (
                <button
                  key={animal}
                  onClick={() => toggleAnimal(animal)}
                  className={selectedAnimals.includes(animal) ? 'selected' : ''}
                >
                  {selectedAnimals.includes(animal) ? '✓ ' : '+ '}
                  {animal}
                </button>
              ))}
            </div>
          </section>

          <section className="grid">
            <div className="panel">
              <h2>Matching Farms</h2>

              {matchingFarms.length === 0 && (
                <div className="empty">
                  No single farm found. SafariConnect can suggest a custom route.
                </div>
              )}

              <div className="cards">
                {matchingFarms.map((farm) => (
                  <div key={farm.id} className="farm-card" onClick={() => setSelectedFarm(farm)}>
                    <img src={farm.image} alt={farm.name} />
                    <div className="farm-content">
                      <h3>{farm.name}</h3>
                      <p>{farm.flag} {farm.area}, {farm.country}</p>
                      <p>⭐ {farm.rating} · {farm.days} days · From ${farm.price}</p>
                      <p>{farm.animals.length} Species Available</p>
                      <div className="chips">
                        {farm.animals.map((animal) => <span key={animal}>{animal}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="panel booking">
              <h2>Booking Request</h2>
              <h3>{selectedFarm.name}</h3>
              <p>{selectedFarm.flag} {selectedFarm.area}, {selectedFarm.country}</p>

              <input type="date" />
              <input type="number" defaultValue="2" />

              <label><input type="checkbox" defaultChecked /> Airport Transport</label>
              <label><input type="checkbox" defaultChecked /> Permit Assistance</label>
              <label><input type="checkbox" /> Taxidermy Coordination</label>

              <h2>Estimated Hunt Cost</h2>
              <div className="cost-box">
                <p>Base package: ${selectedFarm.price}</p>
                <p>Transport estimate: $600</p>
                <p>Permit assistance: $250</p>
                <hr />
                <h3>Total Estimate: ${(selectedFarm.price + 850).toLocaleString()}</h3>
              </div>

              <button onClick={() => alert('Booking request sent')}>Request Booking</button>
            </aside>
          </section>
        </main>
      )}

      {tab === 'planner' && (
        <main className="panel">
          <h2>AI Hunt Planner</h2>
          <p>Plan a complete hunting trip based on country, animals, budget and days.</p>

          <input placeholder="Budget, example: $10 000" />
          <input placeholder="Number of days, example: 7" />
          <input placeholder="Animals wanted, example: Kudu, Buffalo, Zebra" />

          <div className="cost-box">
            <h3>Suggested Plan</h3>
            <p>Best match: Bushveld Trophy Lodge</p>
            <p>Route: O.R. Tambo Airport → Limpopo Lodge → Hunting area</p>
            <p>Recommended extras: transport, permits, taxidermy coordination</p>
          </div>

          <button onClick={() => alert('Planner request created')}>Create Hunt Plan</button>
        </main>
      )}

      {tab === 'permits' && (
        <main className="panel">
          <h2>Permit Centre</h2>
          <p>SafariConnect can assist international hunters with permit and travel requirements.</p>

          <div className="pricing">
            <div>
              <h3>Firearm Import Help</h3>
              <strong>$150</strong>
              <p>Temporary firearm import support.</p>
            </div>

            <div>
              <h3>Trophy Export Support</h3>
              <strong>$250</strong>
              <p>Coordination with outfitter and taxidermist.</p>
            </div>

            <div>
              <h3>Full Travel Admin</h3>
              <strong>$399</strong>
              <p>Permits, transport, documents and support.</p>
            </div>
          </div>

          <input placeholder="Full name" />
          <input placeholder="Country of residence" />
          <input placeholder="Email address" />
          <button onClick={() => alert('Permit assistance request sent')}>Request Permit Help</button>
        </main>
      )}

      {tab === 'farms' && (
        <main className="panel">
          <h2>Join SafariConnect</h2>
          <p>Farms and outfitters pay to be listed and receive international hunting enquiries.</p>

          <div className="pricing">
            <div><h3>Verified</h3><strong>$99/month</strong></div>
            <div><h3>Featured</h3><strong>$199/month</strong></div>
            <div><h3>Premium</h3><strong>$349/month</strong></div>
          </div>

          <h2>Farm Registration</h2>
          <input placeholder="Farm / outfitter name" />
          <input placeholder="Country" />
          <input placeholder="Province / area" />
          <input placeholder="Contact person" />
          <input placeholder="Email" />
          <input placeholder="Phone / WhatsApp" />
          <input placeholder="Animals available" />
          <button onClick={() => alert('Farm application received')}>Apply and Continue to Payment</button>
        </main>
      )}

      {tab === 'login' && (
        <main className="grid">
          <section className="panel">
            <h2>Hunter Register</h2>
            <input placeholder="Full name" />
            <input placeholder="Country" />
            <input placeholder="Email" />
            <input placeholder="Phone / WhatsApp" />
            <input placeholder="Passport country" />
            <button onClick={() => alert('Hunter registered')}>Create Hunter Account</button>
          </section>

          <section className="panel">
            <h2>Login</h2>
            <input placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={() => alert('Login coming soon')}>Login</button>
          </section>
        </main>
      )}

      {tab === 'admin' && (
        <main className="panel">
          <h2>Admin Dashboard</h2>

          <div className="stats">
            <div><h2>4</h2><p>Listed Farms</p></div>
            <div><h2>$746</h2><p>Monthly Listing Income</p></div>
            <div><h2>12</h2><p>Booking Requests</p></div>
          </div>

          <h2>Pending Tasks</h2>
          <div className="cost-box">
            <p>3 farm applications waiting for approval</p>
            <p>5 booking requests waiting for outfitter response</p>
            <p>2 permit requests waiting for documents</p>
          </div>
        </main>
      )}

      <section className="panel">
        <h2>Hunting Destinations Across Africa</h2>
        <div className="countries">
          <span>🇿🇦 South Africa</span>
          <span>🇳🇦 Namibia</span>
          <span>🇿🇼 Zimbabwe</span>
          <span>🇧🇼 Botswana</span>
          <span>🇿🇲 Zambia</span>
          <span>🇲🇿 Mozambique</span>
        </div>
      </section>

      <section className="panel">
        <h2>Hunter Testimonials</h2>
        <div className="testimonial">
          <h3>★★★★★</h3>
          <p>"Best hunting trip I've ever had."</p>
          <strong>John Smith - Texas, USA</strong>
        </div>
        <div className="testimonial">
          <h3>★★★★★</h3>
          <p>"Everything arranged perfectly."</p>
          <strong>Markus Müller - Germany</strong>
        </div>
      </section>

      <footer>
        © 2026 SafariConnect · Connecting hunters and outfitters across Africa
      </footer>
    </div>
  )
}

export default App