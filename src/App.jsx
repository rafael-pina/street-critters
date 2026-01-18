import { useState } from "react";
import { useCollection } from "./hooks/useCollection";
import { identifyAnimal, generateAvatarStyle, RARITIES, ANIMALS } from "./data/animals";

function Header({ stats, currentView, setCurrentView }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🐾</span>
          <span className="logo-text">Street Critters</span>
        </div>
        <div className="points-badge">
          <span className="points-icon">⭐</span>
          <span className="points-value">{stats.totalPoints.toLocaleString()}</span>
        </div>
      </div>
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${currentView === "catch" ? "active" : ""}`}
          onClick={() => setCurrentView("catch")}
        >
          <span>📸</span> Catch
        </button>
        <button
          className={`nav-tab ${currentView === "collection" ? "active" : ""}`}
          onClick={() => setCurrentView("collection")}
        >
          <span>📦</span> Collection
          {stats.totalCatches > 0 && (
            <span className="tab-badge">{stats.totalCatches}</span>
          )}
        </button>
        <button
          className={`nav-tab ${currentView === "pokedex" ? "active" : ""}`}
          onClick={() => setCurrentView("pokedex")}
        >
          <span>📖</span> Critterdex
        </button>
      </nav>
    </header>
  );
}

function CatchView({ onCatch }) {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [avatarStyle, setAvatarStyle] = useState(null);

  const handleCapture = () => {
    setIsScanning(true);
    setResult(null);

    // Simulate scanning animation
    setTimeout(() => {
      const animal = identifyAnimal();
      const style = generateAvatarStyle(animal);
      setResult(animal);
      setAvatarStyle(style);
      setIsScanning(false);
      onCatch(animal);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleCapture();
    }
  };

  return (
    <div className="catch-view">
      {!result ? (
        <>
          <div className={`scanner ${isScanning ? "scanning" : ""}`}>
            <div className="scanner-frame">
              <div className="scanner-corner tl"></div>
              <div className="scanner-corner tr"></div>
              <div className="scanner-corner bl"></div>
              <div className="scanner-corner br"></div>
              {isScanning && <div className="scanner-line"></div>}
            </div>
            <div className="scanner-content">
              {isScanning ? (
                <div className="scanning-text">
                  <span className="scanning-icon">🔍</span>
                  <p>Scanning for critters...</p>
                </div>
              ) : (
                <div className="scanner-prompt">
                  <span className="camera-icon">📷</span>
                  <p>Point at an animal and snap!</p>
                </div>
              )}
            </div>
          </div>
          <div className="catch-actions">
            <label className="capture-btn" htmlFor="photo-input">
              <span className="capture-btn-inner">
                <span className="capture-icon">📸</span>
                <span>Take Photo</span>
              </span>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                disabled={isScanning}
              />
            </label>
            <button
              className="quick-catch-btn"
              onClick={handleCapture}
              disabled={isScanning}
            >
              🎲 Quick Catch (Demo)
            </button>
          </div>
        </>
      ) : (
        <div className="result-view">
          <div className="result-card" style={{ "--glow-color": avatarStyle?.glowColor }}>
            <div className={`rarity-banner rarity-${result.rarity}`}>
              {RARITIES[result.rarity].name}
            </div>
            <div
              className="avatar-container"
              style={{
                background: avatarStyle?.background,
                borderColor: avatarStyle?.borderColor,
              }}
            >
              <span className="avatar-emoji">{result.emoji}</span>
              <div className="avatar-sparkles">
                <span>✨</span>
                <span>✨</span>
                <span>✨</span>
              </div>
            </div>
            <h2 className="result-name">{result.name}</h2>
            <div className="result-details">
              <span className="detail-chip">
                <span>🏠</span> {result.habitat}
              </span>
              <span className="detail-chip points">
                <span>⭐</span> +{RARITIES[result.rarity].points} pts
              </span>
            </div>
            <p className="result-message">
              {result.rarity === "legendary"
                ? "🎉 INCREDIBLE! A legendary catch!"
                : result.rarity === "epic"
                ? "🔥 Amazing! An epic find!"
                : result.rarity === "rare"
                ? "✨ Nice! That's a rare one!"
                : result.rarity === "uncommon"
                ? "👍 Good catch!"
                : "📸 Added to your collection!"}
            </p>
          </div>
          <button className="continue-btn" onClick={() => setResult(null)}>
            Continue Hunting 🐾
          </button>
        </div>
      )}
    </div>
  );
}

function CollectionView({ collection, stats, onClear }) {
  if (collection.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🦔</span>
        <h2>No critters yet!</h2>
        <p>Go outside and catch some animals!</p>
      </div>
    );
  }

  return (
    <div className="collection-view">
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">{stats.totalCatches}</span>
          <span className="stat-label">Caught</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.uniqueSpecies}</span>
          <span className="stat-label">Species</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.totalPoints.toLocaleString()}</span>
          <span className="stat-label">Points</span>
        </div>
      </div>
      
      <div className="rarity-breakdown">
        {Object.entries(RARITIES).map(([key, rarity]) => (
          <div key={key} className="rarity-count" style={{ color: rarity.color }}>
            <span>{stats.byRarity[key] || 0}</span>
            <span className="rarity-dot" style={{ background: rarity.color }}></span>
          </div>
        ))}
      </div>

      <div className="collection-grid">
        {collection.map((animal) => {
          const rarity = RARITIES[animal.rarity];
          return (
            <div
              key={animal.uid}
              className={`collection-card rarity-${animal.rarity}`}
              style={{ borderColor: rarity.color }}
            >
              <div className="card-emoji" style={{ background: rarity.bgColor }}>
                {animal.emoji}
              </div>
              <div className="card-info">
                <span className="card-name">{animal.name}</span>
                <span className="card-points" style={{ color: rarity.color }}>
                  +{rarity.points}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="clear-btn" onClick={onClear}>
        🗑️ Release All
      </button>
    </div>
  );
}

function PokedexView({ collection }) {
  const caughtIds = new Set(collection.map((a) => a.id));

  const grouped = {};
  for (const animal of ANIMALS) {
    if (!grouped[animal.rarity]) grouped[animal.rarity] = [];
    grouped[animal.rarity].push(animal);
  }

  return (
    <div className="pokedex-view">
      <div className="pokedex-progress">
        <span>{caughtIds.size} / {ANIMALS.length} discovered</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(caughtIds.size / ANIMALS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {Object.entries(RARITIES).map(([rarityKey, rarityData]) => (
        <div key={rarityKey} className="pokedex-section">
          <h3 className="pokedex-section-title" style={{ color: rarityData.color }}>
            <span className="rarity-dot" style={{ background: rarityData.color }}></span>
            {rarityData.name}
            <span className="section-count">
              {grouped[rarityKey]?.filter((a) => caughtIds.has(a.id)).length || 0}/
              {grouped[rarityKey]?.length || 0}
            </span>
          </h3>
          <div className="pokedex-grid">
            {grouped[rarityKey]?.map((animal) => {
              const caught = caughtIds.has(animal.id);
              return (
                <div
                  key={animal.id}
                  className={`pokedex-card ${caught ? "caught" : "unknown"}`}
                  style={{
                    borderColor: caught ? rarityData.color : "#333",
                    background: caught ? rarityData.bgColor : "#1a1a2e",
                  }}
                >
                  <span className="pokedex-emoji">{caught ? animal.emoji : "❓"}</span>
                  <span className="pokedex-name">{caught ? animal.name : "???"}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState("catch");
  const { collection, stats, addToCollection, clearCollection } = useCollection();

  return (
    <div className="app">
      <Header
        stats={stats}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="main">
        {currentView === "catch" && <CatchView onCatch={addToCollection} />}
        {currentView === "collection" && (
          <CollectionView
            collection={collection}
            stats={stats}
            onClear={clearCollection}
          />
        )}
        {currentView === "pokedex" && <PokedexView collection={collection} />}
      </main>
    </div>
  );
}
