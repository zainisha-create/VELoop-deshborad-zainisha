import React, { useState } from 'react';
import { InfoTooltip } from '../../components/Tooltips/InfoTooltip';
import styles from './WalletPage.module.css';

export const WalletPage = ({
  profile,
  onAddXP,
  soundEffects
}) => {
  const [activeModal, setActiveModal] = useState(null); // 'send' | 'receive' | 'swap' | 'stake'
  const [stakeAmount, setStakeAmount] = useState('');
  const [unclaimedYield, setUnclaimedYield] = useState(14.85);
  const [toastMessage, setToastMessage] = useState(null);

  const walletAddress = "0x9a8F234C...58E4";

  const transactions = [
    {
      id: 'tx_1',
      title: 'XP Catcher Game Payout',
      type: 'reward',
      amount: '+12 VEs',
      usdValue: '+$12.00',
      date: 'Today, 08:30 AM',
      status: 'Completed',
      txHash: '0x88f...92a1'
    },
    {
      id: 'tx_2',
      title: 'Staking Yield Payout',
      type: 'yield',
      amount: '+3.40 SVEs',
      usdValue: '+$3.40',
      date: 'Today, 00:00 AM',
      status: 'Completed',
      txHash: '0x32b...11c4'
    },
    {
      id: 'tx_3',
      title: 'Referral Bonus Claim',
      type: 'referral',
      amount: '+50 VEs',
      usdValue: '+$50.00',
      date: 'Yesterday, 04:15 PM',
      status: 'Completed',
      txHash: '0xfa9...40dd'
    },
    {
      id: 'tx_4',
      title: 'USDC Withdrawal to Bank',
      type: 'withdraw',
      amount: '-250 VEs',
      usdValue: '-$250.00',
      date: 'Sep 27, 2026',
      status: 'Completed',
      txHash: '0x71e...8801'
    }
  ];

  const handleClaimYield = () => {
    if (unclaimedYield <= 0) return;
    const earned = unclaimedYield;
    setUnclaimedYield(0);
    soundEffects?.playCoinCatch();
    setToastMessage(`Claimed +${earned.toFixed(2)} VEs staking yield!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStakeSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(stakeAmount);
    if (isNaN(val) || val <= 0) return;
    setActiveModal(null);
    soundEffects?.playGemCatch();
    setToastMessage(`Successfully staked ${val} VEs at 12.4% APY!`);
    setStakeAmount('');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className={styles.walletContainer}>
      {/* 1. Total Portfolio Balance Hero */}
      <section className={styles.portfolioHero}>
        <div className={styles.heroBackgroundAura} />
        <div className={styles.heroContent}>
          <div className={styles.balanceHeaderRow}>
            <div>
              <span className={styles.balanceTag}>TOTAL REWARD ASSETS</span>
              <h1 className={styles.totalBalanceText}>$2,160.00 <span className={styles.currencyBadge}>USD</span></h1>
              <p className={styles.plPositive}>▲ +$184.20 (+9.3%) this week</p>
            </div>

            <div className={styles.walletPill} onClick={() => {
              navigator.clipboard?.writeText("0x9a8F234C1792B71e860158E4");
              setToastMessage("Wallet address copied!");
              setTimeout(() => setToastMessage(null), 2500);
            }}>
              <span className={styles.networkDot} />
              <span>{walletAddress}</span>
              <span className={styles.copyIcon}>📋</span>
            </div>
          </div>

          {/* Wallet Action Buttons */}
          <div className={styles.actionButtonsRow}>
            <button type="button" className={styles.actionBtnPrimary} onClick={() => setActiveModal('send')}>
              <span>↗ Send</span>
            </button>
            <button type="button" className={styles.actionBtnPrimary} onClick={() => setActiveModal('receive')}>
              <span>↙ Receive</span>
            </button>
            <button type="button" className={styles.actionBtnSecondary} onClick={() => setActiveModal('swap')}>
              <span>⇄ Convert / Cash Out</span>
            </button>
            <button type="button" className={styles.actionBtnGold} onClick={() => setActiveModal('stake')}>
              <span>⚡ Stake (12.4% APY)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Toast Alert */}
      {toastMessage && (
        <div className={styles.toast}>
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* 2. Asset Balances Grid */}
      <section className={styles.assetsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>Your Token Holdings</h2>
          <InfoTooltip text="VELOOP ecosystem tokens, staked assets, and vault gems can be converted or redeemed for rewards." title="Asset Ledger" />
        </div>

        <div className={styles.assetsGrid}>
          {/* Card 1: VEs */}
          <div className={`${styles.assetCard} ${styles.cardGold}`}>
            <div className={styles.assetHeader}>
              <div className={styles.assetIconGold}>V</div>
              <div>
                <h3 className={styles.assetName}>VE Tokens</h3>
                <span className={styles.assetRate}>1 VE = $1.00 USD</span>
              </div>
            </div>
            <div className={styles.assetAmount}>
              {profile.balances.ves.toLocaleString()} <span className={styles.unit}>VEs</span>
            </div>
            <div className={styles.assetFooter}>
              <span>Value: ${(profile.balances.ves * 1.0).toLocaleString()} USD</span>
              <span className={styles.actionLink} onClick={() => setActiveModal('swap')}>Convert →</span>
            </div>
          </div>

          {/* Card 2: SVEs */}
          <div className={`${styles.assetCard} ${styles.cardEmerald}`}>
            <div className={styles.assetHeader}>
              <div className={styles.assetIconEmerald}>S</div>
              <div>
                <h3 className={styles.assetName}>Staked VEs (SVEs)</h3>
                <span className={styles.assetRate}>12.4% Fixed APY</span>
              </div>
            </div>
            <div className={styles.assetAmount}>
              {profile.balances.sves.toLocaleString()} <span className={styles.unit}>SVEs</span>
            </div>
            <div className={styles.assetFooter}>
              <span>Yield: +{(profile.balances.sves * 0.124).toFixed(1)} VE/yr</span>
              <span className={styles.actionLink} onClick={() => setActiveModal('stake')}>Manage →</span>
            </div>
          </div>

          {/* Card 3: Gems */}
          <div className={`${styles.assetCard} ${styles.cardPurple}`}>
            <div className={styles.assetHeader}>
              <div className={styles.assetIconPurple}>💎</div>
              <div>
                <h3 className={styles.assetName}>Prism Gems</h3>
                <span className={styles.assetRate}>VIP Vault Access</span>
              </div>
            </div>
            <div className={styles.assetAmount}>
              {profile.balances.gems} <span className={styles.unit}>Gems</span>
            </div>
            <div className={styles.assetFooter}>
              <span>Used in Level 0{profile.nextLevel} Vaults</span>
              <span className={styles.actionLink} onClick={() => setActiveModal('swap')}>Use →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Staking & Yield Vault */}
      <section className={styles.stakingVaultCard}>
        <div className={styles.vaultLeft}>
          <div className={styles.vaultBadge}>HIGH-YIELD VAULT</div>
          <h2 className={styles.vaultTitle}>VE Staking Protocol</h2>
          <p className={styles.vaultDesc}>
            Lock your earned VEs to generate passive interest paid out every 24 hours. Early unstaking available with zero penalties.
          </p>

          <div className={styles.vaultMetrics}>
            <div>
              <span className={styles.metricLabel}>CURRENT APY</span>
              <span className={styles.metricValGold}>12.40%</span>
            </div>
            <div>
              <span className={styles.metricLabel}>YOUR STAKE</span>
              <span className={styles.metricVal}>{profile.balances.sves} SVEs</span>
            </div>
            <div>
              <span className={styles.metricLabel}>UNCLAIMED YIELD</span>
              <span className={styles.metricValEmerald}>+{unclaimedYield.toFixed(2)} VEs</span>
            </div>
          </div>
        </div>

        <div className={styles.vaultRight}>
          <button
            type="button"
            className={styles.claimYieldBtn}
            onClick={handleClaimYield}
            disabled={unclaimedYield <= 0}
          >
            {unclaimedYield > 0 ? `Claim Yield (+${unclaimedYield.toFixed(2)} VEs)` : "Yield Claimed ✓"}
          </button>
          <button
            type="button"
            className={styles.stakeMoreBtn}
            onClick={() => setActiveModal('stake')}
          >
            + Stake More VEs
          </button>
        </div>
      </section>

      {/* 4. Transactions Ledger */}
      <section className={styles.ledgerSection}>
        <h2 className={styles.sectionHeading}>Transaction History</h2>
        <div className={styles.ledgerCard}>
          <div className={styles.txList}>
            {transactions.map(tx => (
              <div key={tx.id} className={styles.txRow}>
                <div className={styles.txIconBox}>
                  {tx.type === 'reward' && '🪙'}
                  {tx.type === 'yield' && '⚡'}
                  {tx.type === 'referral' && '👥'}
                  {tx.type === 'withdraw' && '🏦'}
                </div>

                <div className={styles.txMeta}>
                  <div className={styles.txTitle}>{tx.title}</div>
                  <div className={styles.txDate}>{tx.date} • {tx.txHash}</div>
                </div>

                <div className={styles.txAmountGroup}>
                  <div className={tx.amount.startsWith('+') ? styles.amountPositive : styles.amountNegative}>
                    {tx.amount}
                  </div>
                  <div className={styles.usdText}>{tx.usdValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals for Send / Receive / Stake */}
      {activeModal === 'receive' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Receive Assets</h3>
              <button onClick={() => setActiveModal(null)} style={{ color: '#94A3B8' }}>✕</button>
            </div>
            {/* QR Mockup */}
            <div style={{ width: '180px', height: '180px', background: '#FFFFFF', margin: '0 auto 16px', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <rect width="30" height="30" fill="#000" />
                <rect x="70" width="30" height="30" fill="#000" />
                <rect y="70" width="30" height="30" fill="#000" />
                <rect x="10" y="10" width="10" height="10" fill="#FFF" />
                <rect x="80" y="10" width="10" height="10" fill="#FFF" />
                <rect x="10" y="80" width="10" height="10" fill="#FFF" />
                <rect x="40" y="40" width="20" height="20" fill="#000" />
              </svg>
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '8px' }}>Your Multi-chain VELOOP Deposit Address:</p>
            <div style={{ background: '#111322', padding: '10px', borderRadius: '8px', fontSize: '12px', color: '#67E8F9', wordBreak: 'break-all', marginBottom: '16px' }}>
              0x9a8F234C1792B71e860158E4
            </div>
            <button
              style={{ background: 'var(--gold-gradient)', color: '#121424', padding: '10px 20px', borderRadius: '999px', fontWeight: 800, width: '100%' }}
              onClick={() => {
                navigator.clipboard?.writeText("0x9a8F234C1792B71e860158E4");
                alert("Address copied!");
                setActiveModal(null);
              }}
            >
              Copy Address
            </button>
          </div>
        </div>
      )}

      {activeModal === 'stake' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Stake VEs (12.4% APY)</h3>
              <button onClick={() => setActiveModal(null)} style={{ color: '#94A3B8' }}>✕</button>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '14px' }}>
              Available: <strong>{profile.balances.ves} VEs</strong>
            </p>
            <form onSubmit={handleStakeSubmit}>
              <input
                type="number"
                placeholder="Enter VE amount"
                value={stakeAmount}
                onChange={e => setStakeAmount(e.target.value)}
                style={{ width: '100%', background: '#111322', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#FFF', fontSize: '14px', marginBottom: '16px' }}
                required
              />
              <button
                type="submit"
                style={{ background: 'var(--gold-gradient)', color: '#121424', padding: '10px 20px', borderRadius: '999px', fontWeight: 800, width: '100%' }}
              >
                Confirm Staking
              </button>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'swap' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Convert / Cash Out</h3>
              <button onClick={() => setActiveModal(null)} style={{ color: '#94A3B8' }}>✕</button>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '16px' }}>
              Choose your payout channel:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {['USDC Stablecoin (Zero fee)', 'Bank Wire Transfer (ACH)', 'PayPal Transfer', 'Apple / Amazon Gift Card'].map(method => (
                <button
                  key={method}
                  type="button"
                  style={{ background: '#111322', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', borderRadius: '10px', color: '#FFF', fontSize: '13px', textAlign: 'left', fontWeight: 600 }}
                  onClick={() => {
                    alert(`Selected payout: ${method}. Simulation successful!`);
                    setActiveModal(null);
                  }}
                >
                  {method} →
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
