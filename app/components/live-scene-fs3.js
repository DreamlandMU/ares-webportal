import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { observer } from '@ember/object';

export default Component.extend({
  selectSpendLuck: false,
  selectSkillRoll: false,
  luckPoints: 0,
  luckReason: null,
  luckAmount: 1,
  tagName: '',
  gameApi: service(),
  flashMessages: service(),

    didInsertElement: computed('scene.poseChar', function() {
      this._super(...arguments);
      if (this.scene) {
        if (!this.get('scene.poseChar')) {
          let self = this;
          this.scene.poseable_chars.forEach(c => {
            if (!this.get('scene.poseChar') && self.scene.participants.any(w => w.name == c.name)) {
              self.set('scene.poseChar', c);
            }
          });

          if (!this.get('scene.poseChar')) {
            this.set('scene.poseChar', this.get('scene.poseable_chars')[0]);
          }
        }
        let currentChar = this.get('scene.poseChar.name');
        let currentLuck = this.luckList[currentChar] ? this.luckList[currentChar] : '0';
        this.set('luckPoints', currentLuck);
      }
    }),

    poseCharChanged: observer('scene.poseChar', function() {
      let currentChar = this.get('scene.poseChar.name');
      let currentLuck = this.luckList[currentChar] ? this.luckList[currentChar] : '0';
      this.set('luckPoints', currentLuck);
    }),

  actions: {
    spendLuck() {
      let api = this.gameApi;
      let luckReason = this.luckReason;
      let luckAmount = parseInt(this.luckAmount);
    
      this.set('selectSpendLuck', false);
      this.set('luckReason', null);
      this.set('luckAmount', 1);
          
      if (!luckReason) {
        this.flashMessages.danger("You haven't given a reason for your luck spend.");
        return;
      }

      api.requestOne('spendLuck', { scene_id: this.get('scene.id'),
        amount: luckAmount, reason: luckReason, sender: this.get('scene.poseChar.name') }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
      });
    },
    
    startCombat() {
      let api = this.gameApi;
      api.requestOne('startCombat', { scene_id: this.get('scene.id') }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
        this.set('scene.combat', response);
      });
    }
  }
});
