
document.addEventListener('DOMContentLoaded', function() {

  const filters = {
    jour: 'all',
    scene: 'all'
  };


  const jourFilterBtn = document.getElementById('jourFilter');
  const sceneFilterBtn = document.getElementById('sceneFilter');
  const applyFiltersBtn = document.getElementById('applyFilters');
  const jourDropdown = document.getElementById('jourDropdown');
  const sceneDropdown = document.getElementById('sceneDropdown');
  const concertCards = document.querySelectorAll('.concert-card');
  const daySections = document.querySelectorAll('.day-section');


  function toggleDropdown(dropdown) {
    const isActive = dropdown.classList.contains('active');

    document.querySelectorAll('.filter-dropdown').forEach(d => {
      d.classList.remove('active');
    });
    

    if (!isActive) {
      dropdown.classList.add('active');
    }
  }

  function handleFilterSelection(event) {
    if (!event.target.classList.contains('filter-option')) return;
    
    const filterType = event.target.dataset.filter;
    const filterValue = event.target.dataset.value;
    

    filters[filterType] = filterValue;
    

    const dropdown = event.currentTarget;
    dropdown.querySelectorAll('.filter-option').forEach(option => {
      option.classList.remove('selected');
    });
    event.target.classList.add('selected');

    dropdown.classList.remove('active');
  }


  function applyFilters() {
    let visibleCount = 0;
    const dayVisibility = {};


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


    daySections.forEach(section => {
      const sectionDay = section.dataset.day;
      if (dayVisibility[sectionDay]) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });

 
    if (filters.jour === 'all' && filters.scene === 'all') {
      daySections.forEach(section => {
        section.classList.remove('hidden');
      });
    }
  }


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


  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-group')) {
      document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  applyFilters();
});
