import {
  SegmentedView,
  SpaceView,
  SquaredView,
  TouchSurface,
} from 'soundworks/client';

// --------------------------- example
/**
 * Interface for the view of the `audio-buffer-manager` service.
 *
 * @interface AbstractAudioBufferManagerView
 * @extends module:soundworks/client.View
 */
/**
 * Method called when a new information about the currently loaded assets
 * is received.
 *
 * @function
 * @name AbstractAudioBufferManagerView.onProgress
 * @param {Number} percent - The purcentage of loaded assets.
 */
// ------------------------------------

const serviceViews = {
  // ------------------------------------------------
  // AudioBufferManager
  // ------------------------------------------------
  'service:audio-buffer-manager': class AudioBufferManagerView extends SegmentedView {
    constructor(...args) {
      super(`
        <div class="section-top flex-middle">
          <p><%= msg[status] %></p>
        </div>
        <div class="section-center flex-center">
          <% if (showProgress) { %>
          <div class="progress-wrap">
            <div class="progress-bar"></div>
          </div>
          <% } %>
        </div>
        <div class="section-bottom"></div>
      `, {
        status: 'loading',
        showProgress: true,
        msg: {
          loading: 'Loading sounds...',
          decoding: 'Decoding sounds...',
        }
      });
    }

    onRender() {
      super.onRender();
      this.$progressBar = this.$el.querySelector('.progress-bar');
    }

    onProgress(percent) {
      if (percent === 100) {
        this.content.status = 'decoding';
        this.render('.section-top');
      }

      if (this.content.showProgress)
        this.$progressBar.style.width = `${percent}%`;
    }
  },

  // ------------------------------------------------
  // Auth
  // ------------------------------------------------
  'service:auth': class AuthView extends SegmentedView {
    constructor(...args) {
      super(...args);

      this._sendPasswordCallback = () => {};
      this._resetCallback = () => {};
    }

    onRender() {
      super.onRender();

      this.installEvents({
        'click #send': () => {
          const password = this.$el.querySelector('#password').value;

          if (password !== '')
            callback(password);
        },
        'click #reset': () => this._resetCallback(),
      });
    }

    setSendPasswordCallback(callback) {
      this._sendPasswordCallback = callback;
    }

    setResetCallback(callback) {
      this._resetCallback = callback;
    }

    updateRejectedStatus(value) {
      this.content.rejected = value;
    }
  },

  // ------------------------------------------------
  // Checkin
  // ------------------------------------------------
  'service:checkin': class CheckinView extends SegmentedView {
    constructor(...args) {
      super(...args);

      this._readyCallback = null;
    }

    onRender() {
      super.onRender();

      const eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';

      this.installEvents({
        [eventName]: this._readyCallback,
      });
    }

    setReadyCallback(callback) {
      this._readyCallback = callback;
    }

    updateLabel(value) {
      this.content.label = value;
    }

    updateErrorStatus(value) {
      this.content.error = value;
    }
  },

  // ------------------------------------------------
  // Locator
  // ------------------------------------------------
  'service:locator': class LocatorView extends SquaredView {
    constructor(template, content, events, options) {
      super(template, content, events, options);

      this.area = null;
      this._selectCallback = () => {};

      this._onAreaTouchStart = this._onAreaTouchStart.bind(this);
      this._onAreaTouchMove = this._onAreaTouchMove.bind(this);
    }

    setArea(area) {
      this._area = area;
      this._renderArea();
    }

    setSelectCallback(callback) {
      this._selectCallback = callback;
    }

    remove() {
      super.remove();

      this.surface.removeListener('touchstart', this._onAreaTouchStart);
      this.surface.removeListener('touchmove', this._onAreaTouchMove);
    }

    _renderArea() {
      this.selector = new SpaceView();
      this.selector.setArea(this._area);
      this.setViewComponent('.section-square', this.selector);
      this.render('.section-square');

      this.surface = new TouchSurface(this.selector.$svgContainer);
      this.surface.addListener('touchstart', this._onAreaTouchStart);
      this.surface.addListener('touchmove', this._onAreaTouchMove);
    }

    _onAreaTouchStart(id, normX, normY) {
      if (!this.position) {
        this._createPosition(normX, normY);

        this.content.showBtn = true;
        this.render('.section-float');
        this.installEvents({
          'click .btn': (e) => this._selectCallback(this.position.x, this.position.y),
        });
      } else {
        this._updatePosition(normX, normY);
      }
    }

    _onAreaTouchMove(id, normX, normY) {
      this._updatePosition(normX, normY);
    }

    _createPosition(normX, normY) {
      this.position = {
        id: 'locator',
        x: normX * this._area.width,
        y: normY * this._area.height,
      };

      this.selector.addPoint(this.position);
    }

    _updatePosition(normX, normY) {
      this.position.x = normX * this._area.width;
      this.position.y = normY * this._area.height;

      this.selector.updatePoint(this.position);
    }
  },

  // ------------------------------------------------
  // Platform
  // ------------------------------------------------
  'service:placer': class PlacerViewList extends SquaredView {
    constructor(...args) {
      super(...args);

      this._onSelectionChange = this._onSelectionChange.bind(this);
    }

    _onSelectionChange(e) {
      this.content.showBtn = true;
      this.render('.section-float');
      this.installEvents({
        'click .btn': (e) => {
          const position = this.selector.value;

          if (position)
            this._onSelect(position.index, position.label, position.coordinates);
        }
      });
    }

    setArea(area) { /* no need for area */ }

    displayPositions(capacity, labels = null, coordinates = null, maxClientsPerPosition = 1) {
      this.positions = [];
      this.numberPositions = capacity / maxClientsPerPosition;

      for (let index = 0; index < this.numberPositions; index++) {
        const label = labels !== null ? labels[index] : (index + 1).toString();
        const position = { index: index, label: label };

        if (coordinates)
          position.coordinates = coordinates[index];

        this.positions.push(position);
      }

      this.selector = new SelectView({
        instructions: this.content.instructions,
        entries: this.positions,
      });

      this.setViewComponent('.section-square', this.selector);
      this.render('.section-square');

      this.selector.installEvents({
        'change': this._onSelectionChange,
      });
    }

    updateDisabledPositions(indexes) {
      for (let index = 0; index < this.numberPositions; index++) {
        if (indexes.indexOf(index) === -1)
          this.selector.enableIndex(index);
        else
          this.selector.disableIndex(index);
      }
    }

    setSelectCallack(callback) {
      this._onSelect = callback;
    }

    reject(disabledPositions) {
      if (disabledPositions.length >= this.numberPositions) {
        this.setViewComponent('.section-square');
        this.content.rejected = true;
        this.render();
      } else {
        this.disablePositions(disabledPositions);
      }
    }
  },

  // 'service:placer-graphic': class PlacerViewGraphic extends SquaredView {
  //   constructor(...args) {
  //     super(...args);

  //     this._area = null;
  //     this._disabledPositions = [];
  //     this._onSelectionChange = this._onSelectionChange.bind(this);
  //   }

  //   _onSelectionChange(e) {
  //     const position = this.selector.shapePointMap.get(e.target);
  //     const disabledIndex = this._disabledPositions.indexOf(position.index);

  //     if (disabledIndex === -1)
  //       this._onSelect(position.id, position.label, [position.x, position.y]);
  //   }

  //   setArea(area) {
  //     this._area = area;
  //   }

  //   displayPositions(capacity, labels = null, coordinates = null, maxClientsPerPosition = 1) {
  //     this.numberPositions = capacity / maxClientsPerPosition;
  //     this.positions = [];

  //     for (let i = 0; i < this.numberPositions; i++) {
  //       const label = labels !== null ? labels[i] : (i + 1).toString();
  //       const position = { id: i, label: label };
  //       const coords = coordinates[i];
  //       position.x = coords[0];
  //       position.y = coords[1];

  //       this.positions.push(position);
  //     }

  //     this.selector = new SpaceView();
  //     this.selector.setArea(this._area);
  //     this.setViewComponent('.section-square', this.selector);
  //     this.render('.section-square');

  //     this.selector.setPoints(this.positions);

  //     this.selector.installEvents({
  //       'click .point': this._onSelectionChange
  //     });
  //   }

  //   updateDisabledPositions(indexes) {
  //     this._disabledPositions = indexes;

  //     for (let index = 0; index < this.numberPositions; index++) {
  //       const position = this.positions[index];
  //       const isDisabled = indexes.indexOf(index) !== -1;
  //       position.selected = isDisabled ? true : false;
  //       this.selector.updatePoint(position);
  //     }
  //   }

  //   setSelectCallack(callback) {
  //     this._onSelect = callback;
  //   }

  //   reject(disabledPositions) {
  //     if (disabledPositions.length >= this.numberPositions) {
  //       this.setViewComponent('.section-square');
  //       this.content.rejected = true;
  //       this.render();
  //     } else {
  //       this.view.updateDisabledPositions(disabledPositions);
  //     }
  //   }
  // },

  // ------------------------------------------------
  // Platform
  // ------------------------------------------------
  'service:platform': class PlatformView extends SegmentedView {
    constructor(...args) {
      super(...args);

      this._touchstartCallback = () => {};
      this._mousedownCallback = () => {};
    }

    onRender() {
      super.onRender();

      this.installEvents({
        'mousedown': (e) => this._mousedownCallback(e),
        'touchstart': (e) => this._touchstartCallback(e),
      });
    }

    setTouchStartCallback(callback) {
      this._touchstartCallback = callback;
    }

    setMouseDownCallback(callback) {
      this._mousedownCallback = callback;
    }

    updateCheckingStatus(value) {
      this.content.checking = value;
    }

    updateIsCompatibleStatus(value) {
      this.content.isCompatible = value;
    }

    updateHasAuthorizationsStatus(value) {
      this.content.hasAuthorizations = value;
    }
  },

  // ------------------------------------------------
  // Raw-Socket
  // ------------------------------------------------
  'service:raw-socket': class RawSocketView extends SegmentedView {},

  // ------------------------------------------------
  // Sync
  // ------------------------------------------------
  'service:sync': class RawSocketView extends SegmentedView {},
};

export default serviceViews;
