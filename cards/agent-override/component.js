{{> cards/card_component componentName='agent-override' }}

class agent_overrideCardComponent extends BaseCard['agent-override'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
    this.setTemplate(`{{{read 'cards/agent-override/template' }}}`);
  }

  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param {Object} profile of the entity in the card
   */
  dataForRender(profile) {
    return {
      title: profile.name, // The header text of the card
      titleUrl: profile.website || profile.landingPageUrl, // If the card title is a clickable link, set URL here
      target: '_top', // If the title's URL should open in a new tab, etc.
      titleEventOptions: this.addDefaultEventOptions(), // The event options for title click analytics
      // subtitle: '', // The sub-header text of the card
      hours: Formatter.openStatus(profile),
      // services: [], // Used for a comma delimited list of services for the location
      address: Formatter.address(profile), // The address for the card
      phone: Formatter.nationalizedPhoneDisplay(profile), // The phone number for the card
      phoneEventOptions: this.addDefaultEventOptions(), // The analytics event options for phone clicks
      distance: Formatter.toMiles(profile), // Distance from the user’s or inputted location
      // details: profile.description, // The description for the card, displays below the address and phone
      image: Formatter.image(profile.c_professionalHeadshot).url, // The URL of the image to display on the card
      altText: Formatter.image(profile.c_professionalHeadshot).alternateText,  // The alternate text for the image
      showOrdinal: true, // If the ordinal should be displayed on the card
      CTA1: { // The primary call to action for the card
        iconName: 'phone', // The icon to use for the CTA
        label: 'Call', // The label of the CTA
        url: Formatter.phoneLink(profile), // The URL a user will be directed to when clicking
        target: '_top', // If the URL will be opened in a new tab, etc.
        eventType: 'TAP_TO_CALL', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(), // The analytics event options for CTA clicks
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      CTA2: { // The secondary call to action for the card
        label: 'Get Directions',
        iconName: 'directions',
        url: Formatter.getDirectionsUrl(profile),
        target: '_top',
        eventType: 'DRIVING_DIRECTIONS',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      }
    };
  }
}

ANSWERS.registerComponentType(agent_overrideCardComponent);
