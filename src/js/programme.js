// Programme Page Filtering System
document.addEventListener('DOMContentLoaded', function() {
  // Filter state
  const filters = {
    jour: 'all',
    scene: 'all'
  };

  // DOM Elements
  const jourFilterBtn = document.getElementById('jourFilter');
  const sceneFilterBtn = document.getElementById('sceneFilter');
  const applyFiltersBtn = document.getElementById('applyFilters');
  const jourDropdown = document.getElementById('jourDropdown');
  const sceneDropdown = document.getElementById('sceneDropdown');
  const concertCards = document.querySelectorAll('.concert-card');
  const daySections = document.querySelectorAll('.day-section');

  // Toggle dropdown visibility
  function toggleDropdown(dropdown) {
    const isActive = dropdown.classList.contains('active');
    
    // Close all dropdowns
    document.querySelectorAll('.filter-dropdown').forEach(d => {
      d.classList.remove('active');
    });
    
    // Toggle current dropdown
    if (!isActive) {
      dropdown.classList.add('active');
    }
  }

  // Handle filter selection
  function handleFilterSelection(event) {
    if (!event.target.classList.contains('filter-option')) return;
    
    const filterType = event.target.dataset.filter;
    const filterValue = event.target.dataset.value;
    
    // Update filter state
    filters[filterType] = filterValue;
    
    // Update selected state
    const dropdown = event.currentTarget;
    dropdown.querySelectorAll('.filter-option').forEach(option => {
      option.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Close dropdown
    dropdown.classList.remove('active');
  }

  // Apply filters
  function applyFilters() {
    let visibleCount = 0;
    const dayVisibility = {};

    // First pass: check which cards should be visible
    concertCards.forEach(card => {
      const cardDay = card.dataset.day;
      const cardScene = card.dataset.scene;
      
      const dayMatch = filters.jour === 'all' || cardDay === filters.jour;
      const sceneMatch = filters.scene === 'all' || cardScene === filters.scene;
      
      if (dayMatch && sceneMatch) {
        card.classList.remove('hidden');
        card.classList.add('show');
        visibleCount++;
        dayVisibility[cardDay] = true;
      } else {
        card.classList.add('hidden');
        card.classList.remove('show');
      }
    });

    // Second pass: show/hide day sections based on whether they have visible cards
    daySections.forEach(section => {
      const sectionDay = section.dataset.day;
      if (dayVisibility[sectionDay]) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });

    // If no filters applied, show all sections
    if (filters.jour === 'all' && filters.scene === 'all') {
      daySections.forEach(section => {
        section.classList.remove('hidden');
      });
    }
  }

  // Event Listeners
  if (jourFilterBtn) {
    jourFilterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(jourDropdown);
    });
  }

  if (sceneFilterBtn) {
    sceneFilterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(sceneDropdown);
    });
  }

  if (jourDropdown) {
    jourDropdown.addEventListener('click', handleFilterSelection);
  }

  if (sceneDropdown) {
    sceneDropdown.addEventListener('click', handleFilterSelection);
  }

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-group')) {
      document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Initial state - show all cards
  applyFilters();
});
