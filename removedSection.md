 <!-- Glassmorphic Dashboard Panel (Zero Text, pure custom iconography) -->
    <div class="dashboard" id="ui-dashboard">
        <!-- Section: Shapes Morph Controls -->
        <div class="control-group" id="group-morph">
            <!-- 1. Reformed Badge (Logo) -->
            <button class="icon-btn active" id="btn-shape-logo" title="Reformed Badge">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <circle cx="12" cy="12" r="10" stroke-width="1.5" />
                    <path d="M8 12 Q 12 8, 16 12 Q 12 16, 8 12 Z" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
                <span class="active-indicator"></span>
            </button>
            
            <!-- 2. Cyber Atom (Sphere) -->
            <button class="icon-btn" id="btn-shape-sphere" title="Cyber Atom">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <circle cx="12" cy="12" r="4.5" fill="currentColor" opacity="0.8" />
                    <ellipse cx="12" cy="12" rx="9" ry="2" transform="rotate(30, 12, 12)" stroke-width="1.5" />
                    <ellipse cx="12" cy="12" rx="9" ry="2" transform="rotate(-30, 12, 12)" stroke-width="1.5" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- 3. DNA Helix (Helix) -->
            <button class="icon-btn" id="btn-shape-helix" title="DNA Helix">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M4 6 C 6 2, 18 22, 20 18" stroke-width="1.5" />
                    <path d="M4 18 C 6 22, 18 2, 20 6" stroke-width="1.5" opacity="0.6" />
                    <line x1="6" y1="9" x2="18" y2="15" stroke-width="1.5" />
                    <line x1="6" y1="15" x2="18" y2="9" stroke-width="1.5" />
                    <circle cx="12" cy="12" r="1.2" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- 4. Liquid Crimson Wave (Wave) -->
            <button class="icon-btn" id="btn-shape-wave" title="Liquid Crimson Wave">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M2 12 Q 7 6, 12 12 T 22 12" stroke-width="1.8" />
                    <path d="M2 16 Q 7 10, 12 16 T 22 16" stroke-width="1.2" opacity="0.5" />
                    <path d="M2 8 Q 7 2, 12 8 T 22 8" stroke-width="1.2" opacity="0.5" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- 5. Saturnian Ring (Vortex) -->
            <button class="icon-btn" id="btn-shape-vortex" title="Saturnian Vortex">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-15, 12, 12)" stroke-width="1.5" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                    <path d="M12 2 A 10 10 0 0 0 2 12" stroke-width="1.2" stroke-dasharray="2,2" />
                    <path d="M12 22 A 10 10 0 0 0 22 12" stroke-width="1.2" stroke-dasharray="2,2" />
                </svg>
                <span class="active-indicator"></span>
            </button>
        </div>

        <div class="divider"></div>

        <!-- Section: Filters / Color shifts -->
        <div class="control-group" id="group-filters">
            <!-- 1. Original Red/White Branding -->
            <button class="icon-btn active" id="btn-filter-original" title="Original Branding">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <circle cx="12" cy="12" r="9" stroke-width="1.5" />
                    <circle cx="12" cy="12" r="5" fill="#ff0033" stroke="none" />
                    <circle cx="12" cy="12" r="3" fill="#ffffff" stroke="none" />
                </svg>
                <span class="active-indicator"></span>
            </button>
            
            <!-- 2. Cyber Neon (Cyan / Magenta) -->
            <button class="icon-btn" id="btn-filter-neon" title="Cyber Neon Theme">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <rect x="4" y="4" width="16" height="16" rx="3" stroke-width="1.5" />
                    <circle cx="9" cy="9" r="2" fill="#00f0ff" stroke="none" />
                    <circle cx="15" cy="15" r="2.5" fill="#ff007f" stroke="none" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- 3. Liquid Gold Theme -->
            <button class="icon-btn" id="btn-filter-gold" title="Liquid Gold Theme">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M12 2 C 7 2, 4 6, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 6, 17 2, 12 2 Z" stroke-width="1.5" />
                    <circle cx="12" cy="9" r="3" fill="#ffbd00" stroke="none" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- 4. Monochromatic Matrix (Chrome Silver) -->
            <button class="icon-btn" id="btn-filter-mono" title="Monochromatic Matrix">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="1.5" />
                    <line x1="3" y1="12" x2="21" y2="12" stroke-width="1.5" />
                    <line x1="12" y1="3" x2="12" y2="21" stroke-width="1.5" opacity="0.4" />
                </svg>
                <span class="active-indicator"></span>
            </button>
        </div>

        <div class="divider"></div>

        <!-- Section: Sound, Slow-mo, Explosion Controls -->
        <div class="control-group" id="group-actions">
            <!-- Warm Analog Synthesizer Trigger -->
            <button class="icon-btn" id="btn-audio" title="Analog Synthesizer">
                <svg viewBox="0 0 24 24" width="22" height="22" class="audio-waves">
                    <line x1="3" y1="12" x2="3" y2="12" id="wave1" />
                    <line x1="7" y1="12" x2="7" y2="12" id="wave2" />
                    <line x1="11" y1="12" x2="11" y2="12" id="wave3" />
                    <line x1="15" y1="12" x2="15" y2="12" id="wave4" />
                    <line x1="19" y1="12" x2="19" y2="12" id="wave5" />
                    <line x1="23" y1="12" x2="23" y2="12" id="wave6" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- Slow-Mo / Time Dilation -->
            <button class="icon-btn" id="btn-speed" title="Time Dilation">
                <svg viewBox="0 0 24 24" width="22" height="22" class="spin-icon">
                    <circle cx="12" cy="12" r="9" stroke-width="1.5" />
                    <polyline points="12,6 12,12 15.5,14.5" stroke-width="1.5" />
                </svg>
                <span class="active-indicator"></span>
            </button>

            <!-- Heavy Shockwave Shatter -->
            <button class="icon-btn" id="btn-explode" title="Spatial Shatter">
                <svg viewBox="0 0 24 24" width="22" height="22" class="shatter-icon">
                    <path d="M12 2 L14.5 8.5 L21.5 9 L16.5 13.5 L18 20.5 L12 17 L6 20.5 L7.5 13.5 L2.5 9 L9.5 8.5 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
                    <line x1="12" y1="12" x2="5" y2="5" stroke-width="1.2" />
                    <line x1="12" y1="12" x2="19" y2="5" stroke-width="1.2" />
                    <line x1="12" y1="12" x2="19" y2="19" stroke-width="1.2" />
                    <line x1="12" y1="12" x2="5" y2="19" stroke-width="1.2" />
                </svg>
            </button>
        </div>
    </div>
