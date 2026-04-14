// Repair categories for filtering in step 1
const REPAIR_CATEGORIES = {
  "All": null,
  "Maintenance": ["Oil Change", "Tire Rotation", "Air Filter Replacement", "Cabin Air Filter Replacement", "Spark Plug Replacement", "Battery Replacement", "Serpentine Belt Replacement"],
  "Brakes": ["Brake Pad Replacement", "Brake Rotor Replacement", "Brake Fluid Flush"],
  "Cooling": ["Coolant Flush", "Water Pump Replacement", "Thermostat Replacement", "Radiator Replacement"],
  "Transmission & Drivetrain": ["Transmission Flush", "Transmission Repair", "Front Differential Flush", "Rear Differential Flush", "Transfer Case Flush"],
  "Fuel System": ["Fuel Pump Replacement", "Fuel Filter Replacement", "Fuel Injector Service"],
  "AC & Climate": ["AC Recharge", "AC Compressor Replacement"],
  "Steering & Suspension": ["Wheel Alignment", "Power Steering Flush", "Shock/Strut Replacement", "Control Arm Replacement", "Tie Rod Replacement"],
  "Electrical": ["Alternator Replacement", "Starter Motor Replacement", "Check Engine Light Diagnosis", "Electrical Diagnostic"],
  "Emissions": ["Catalytic Converter Replacement", "O2 Sensor Replacement", "EGR Valve Service"],
  "EcoBoost": ["EcoBoost Turbo Service", "Timing Chain Service"]
};

const REPAIR_DATA = {
  // ============================================
  // MAINTENANCE
  // ============================================
  "Oil Change": {
    concerns: [
      "Customer states oil change maintenance light is illuminated on instrument cluster",
      "Customer states engine oil life monitor indicates 0% oil life remaining",
      "Customer states vehicle is due for scheduled oil change per maintenance schedule",
      "Customer states engine seems louder than normal and oil change is overdue",
      "Customer states oil appears dark and dirty on dipstick check"
    ],
    conditions: [
      "Found engine oil life monitor at 0% and oil appears dark and degraded on dipstick inspection",
      "Found engine oil level at minimum mark on dipstick with oil showing signs of thermal breakdown",
      "Found vehicle has reached scheduled maintenance interval for engine oil and filter replacement",
      "Found engine oil is discolored and has exceeded manufacturer recommended change interval per Ford maintenance schedule",
      "Found oil change reminder illuminated and oil filter shows signs of restricted flow"
    ],
    corrections: [
      "Performed engine oil and filter service. Drained and replaced engine oil with Motorcraft SAE 5W-30 Full Synthetic per Ford WSS-M2C961-A1 specification. Installed new Motorcraft FL-500S oil filter. Reset oil life monitor. Verified no leaks at drain plug and filter",
      "Performed scheduled oil change per Ford workshop manual procedure. Removed and replaced oil drain plug gasket per specification. Installed Motorcraft FL-500S filter and filled with Motorcraft SAE 5W-30 Full Synthetic oil to proper level. Reset oil life monitor to 100%",
      "Performed engine oil and filter replacement. Drained old oil and removed spent filter. Installed new Motorcraft FL-500S oil filter torqued to specification. Filled with Motorcraft SAE 5W-30 Full Synthetic meeting Ford WSS-M2C961-A1 spec. Verified oil level on dipstick and reset maintenance monitor",
      "Performed oil change service per Ford scheduled maintenance requirements. Replaced oil filter with Motorcraft FL-500S and filled crankcase with Motorcraft SAE 5W-30 Full Synthetic to specified capacity. Torqued drain plug to specification. Reset oil life monitor and verified no leaks",
      "Performed complete engine oil service. Removed drain plug and drained engine oil. Replaced drain plug with new gasket and torqued to spec. Installed new Motorcraft FL-500S oil filter. Filled with Motorcraft SAE 5W-30 Full Synthetic per Ford WSS-M2C961-A1. Verified oil level and reset oil life monitor"
    ]
  },
  "Tire Rotation": {
    concerns: [
      "Customer states vehicle is due for scheduled tire rotation per maintenance interval",
      "Customer states uneven tire wear noticed on front tires",
      "Customer states vehicle pulls slightly and tires have not been rotated recently",
      "Customer states tire wear indicator bars are showing more on front tires than rear",
      "Customer states vibration at highway speed and tires are due for rotation"
    ],
    conditions: [
      "Found front tires showing increased wear on outer edges compared to rear tires upon tread depth measurement",
      "Found tire tread depth measurements indicate uneven wear pattern consistent with rotation interval being exceeded",
      "Found vehicle has reached recommended tire rotation interval per Ford maintenance schedule",
      "Found front tires measuring 5/32 inch tread depth and rear tires measuring 7/32 inch tread depth indicating rotation is needed",
      "Found irregular wear pattern on front tires during multi-point inspection; tires are due for rotation per mileage interval"
    ],
    corrections: [
      "Performed tire rotation per Ford recommended rotation pattern. Rotated tires in rearward cross pattern per Ford workshop manual. Adjusted tire pressures to door placard specification. Torqued lug nuts to specification",
      "Performed tire rotation per Ford maintenance schedule. Moved tires in recommended pattern per workshop manual procedure. Inspected all tires for abnormal wear, damage, and proper tread depth. Set all tire pressures to placard specification and torqued all lug nuts to spec",
      "Performed four-tire rotation using Ford recommended rearward cross pattern. Inspected brake components during service. Verified all tire pressures set to door placard specification. Torqued all wheel lug nuts to factory specification using calibrated torque wrench",
      "Performed tire rotation per Ford scheduled maintenance requirements. Rotated all four tires per manufacturer recommended pattern. Measured and recorded tread depth at all four positions. Adjusted inflation pressures to specification per door placard. Torqued lug nuts to spec",
      "Performed tire rotation service. Rotated tires per Ford recommended pattern outlined in workshop manual. Inspected tires for irregular wear, sidewall damage, and proper inflation. Set all pressures to door placard value. Torqued all lug nuts to factory specification"
    ]
  },
  "Air Filter Replacement": {
    concerns: [
      "Customer states vehicle seems sluggish on acceleration and air filter has not been replaced recently",
      "Customer states engine air filter is due for replacement per scheduled maintenance",
      "Customer states reduced fuel economy noticed over last several tanks of fuel",
      "Customer states check engine light is on and air filter appears dirty",
      "Customer states whistling noise from engine area during acceleration"
    ],
    conditions: [
      "Found engine air filter element excessively dirty and restricted upon visual inspection",
      "Found Motorcraft FA-1927 engine air filter element is contaminated with debris and has exceeded service interval",
      "Found engine air filter housing contains debris and filter element shows heavy contamination restricting airflow",
      "Found engine air filter is discolored and saturated with particulate matter beyond serviceable condition",
      "Found engine air filter has reached maximum service interval per Ford maintenance schedule and shows restricted airflow"
    ],
    corrections: [
      "Replaced engine air filter with new Motorcraft FA-1927 air filter element. Cleaned air filter housing of debris prior to installation. Verified proper seating and seal of filter element in housing. Verified air filter housing clips are secure",
      "Performed engine air filter replacement per Ford scheduled maintenance. Removed and discarded contaminated filter element. Cleaned air filter housing and intake tube. Installed new Motorcraft FA-1927 air filter and secured housing clips per workshop manual procedure",
      "Replaced engine air filter element with Motorcraft FA-1927. Inspected air intake duct and housing for debris or damage. Cleaned housing interior prior to new filter installation. Verified proper filter seating and housing seal integrity",
      "Performed engine air filter service. Removed restricted air filter element from housing. Inspected air intake system for debris or obstruction. Installed new Motorcraft FA-1927 engine air filter element. Secured air filter housing cover and verified all clips are latched",
      "Replaced contaminated engine air filter with new Motorcraft FA-1927 per Ford workshop manual procedure. Cleaned air filter housing and inspected intake ducting for damage or leaks. Installed new filter element ensuring proper orientation and seal. Verified housing is properly secured"
    ]
  },
  "Cabin Air Filter Replacement": {
    concerns: [
      "Customer states musty or unpleasant odor coming from HVAC vents",
      "Customer states reduced airflow from air conditioning and heating vents",
      "Customer states cabin air filter is due for replacement per maintenance schedule",
      "Customer states fogging on interior windshield takes longer to clear than normal",
      "Customer states allergies are worse when driving and cabin filter has not been changed"
    ],
    conditions: [
      "Found cabin air filter element is heavily contaminated with dirt, pollen, and debris restricting HVAC airflow",
      "Found Motorcraft FP-79 cabin air filter is excessively dirty and producing odor upon removal and inspection",
      "Found cabin air filter has exceeded Ford recommended replacement interval and is restricting blower motor airflow",
      "Found HVAC cabin air filter element saturated with particulate matter causing reduced air volume from vents",
      "Found cabin air filter contaminated with organic material and moisture causing musty odor from HVAC system"
    ],
    corrections: [
      "Replaced cabin air filter with new Motorcraft FP-79 filter element. Cleaned filter housing area of debris prior to installation. Verified proper filter orientation and seating per Ford workshop manual. Verified HVAC blower airflow restored to normal operation",
      "Performed cabin air filter replacement per Ford scheduled maintenance. Removed contaminated Motorcraft FP-79 element from HVAC housing. Cleaned housing of accumulated debris. Installed new Motorcraft FP-79 cabin air filter with correct airflow direction. Verified blower operation at all speeds",
      "Replaced HVAC cabin air filter with new Motorcraft FP-79. Accessed filter housing per Ford workshop manual procedure. Removed old filter and vacuumed housing to remove loose debris. Installed new filter element in correct orientation. Tested HVAC system for proper airflow at all fan speeds",
      "Performed cabin air filter service. Removed glove box assembly per workshop manual to access cabin air filter housing. Removed and discarded contaminated filter element. Cleaned housing area and installed new Motorcraft FP-79 cabin air filter. Reassembled glove box and verified HVAC airflow",
      "Replaced cabin air filter element with Motorcraft FP-79 per Ford maintenance schedule. Inspected HVAC housing for moisture or mold contamination. Cleaned housing interior. Installed new filter with proper airflow direction arrow alignment. Verified system operation and restored airflow through all vents"
    ]
  },
  "Spark Plug Replacement": {
    concerns: [
      "Customer states engine misfires intermittently and spark plugs have never been replaced",
      "Customer states vehicle has reached scheduled spark plug replacement interval",
      "Customer states engine hesitates during acceleration and feels rough at idle",
      "Customer states check engine light is on and vehicle has high mileage on original spark plugs",
      "Customer states poor fuel economy and reduced engine performance noticed recently"
    ],
    conditions: [
      "Found spark plugs worn beyond service limit with electrode gap exceeding specification upon removal and inspection",
      "Found original spark plugs installed with vehicle exceeding Ford recommended replacement interval of 100,000 miles",
      "Found spark plug electrode erosion and carbon fouling on cylinders upon removal per Ford workshop manual procedure",
      "Found misfire codes stored in PCM. Inspection of spark plugs reveals worn electrodes and excessive gap on multiple cylinders",
      "Found spark plugs showing signs of normal wear with electrode gap out of specification causing inconsistent ignition"
    ],
    corrections: [
      "Replaced all spark plugs with new Motorcraft SP-534 platinum spark plugs per Ford workshop manual procedure. Gapped spark plugs to factory specification. Applied anti-seize compound to threads per Ford service procedure. Torqued to specification. Cleared DTCs and verified engine runs smooth",
      "Performed spark plug replacement per Ford scheduled maintenance. Removed ignition coils and extracted all spark plugs. Installed new Motorcraft SP-547 iridium spark plugs gapped to specification. Torqued plugs to factory spec per workshop manual. Reinstalled ignition coils and verified proper engine operation",
      "Replaced spark plugs with Motorcraft SP-534 units gapped to Ford specification. Inspected ignition coil boots for damage or carbon tracking during service. Applied dielectric grease to coil boots. Torqued spark plugs to specification per Ford workshop manual. Verified no misfires present after repair",
      "Performed complete spark plug service. Removed intake components as necessary per Ford workshop manual to access all spark plugs. Removed and discarded worn plugs. Installed new Motorcraft SP-547 spark plugs torqued to specification. Reassembled all components. Cleared PCM codes and road tested to verify repair",
      "Replaced all engine spark plugs with Motorcraft SP-534 per Ford workshop manual procedure. Inspected spark plug wells for oil or coolant intrusion. Verified proper gap on each new plug prior to installation. Torqued to factory specification. Reinstalled coil packs with dielectric grease on boots. Test drove and confirmed smooth operation"
    ]
  },
  "Battery Replacement": {
    concerns: [
      "Customer states vehicle is slow to crank when starting in the morning",
      "Customer states battery warning light illuminated on instrument cluster",
      "Customer states vehicle would not start and required a jump start to get running",
      "Customer states electrical accessories dim when vehicle is idling",
      "Customer states battery is original to the vehicle and wants it tested"
    ],
    conditions: [
      "Found battery fails load test at 9.2 volts under load using Rotunda diagnostic tester. Battery CCA measures below minimum specification",
      "Found Motorcraft battery showing 11.8 volts at rest with CCA testing below acceptable threshold per Ford diagnostic procedure",
      "Found battery date code indicates unit is beyond expected service life. Load test confirms battery cannot maintain voltage under cranking load per Ford test specification",
      "Found battery terminals corroded and battery fails conductance test. Open circuit voltage reads 11.6 volts indicating one or more dead cells",
      "Found vehicle battery fails Ford standard battery test procedure. Internal resistance is elevated and CCA output is below minimum specification for application"
    ],
    corrections: [
      "Replaced battery with new Motorcraft BXT series battery meeting Ford specification for vehicle application. Cleaned battery tray and cable terminals. Applied terminal protectant to prevent corrosion. Performed battery management system reset per Ford workshop manual. Verified proper charging system voltage",
      "Performed battery replacement. Removed failed battery and cleaned battery tray of corrosion. Installed new Motorcraft BXT series battery. Torqued battery hold-down to specification. Cleaned and tightened cable connections. Reset BMS per Ford procedure. Verified charging voltage at 13.8-14.6 volts",
      "Replaced vehicle battery with Motorcraft BXT series per Ford specification. Inspected and cleaned positive and negative cable terminals. Applied Motorcraft battery terminal protectant. Secured battery with hold-down bracket torqued to spec. Performed BMS reset with scan tool per Ford workshop manual procedure",
      "Performed battery test and replacement service. Documented failed test results. Removed old battery and inspected battery tray for corrosion damage. Installed new Motorcraft BXT series battery. Connected and tightened terminals to specification. Performed battery monitoring system reset. Verified alternator output within specification",
      "Replaced failed battery with new Motorcraft BXT series unit per Ford application guide. Cleaned cable ends with battery terminal cleaning tool. Applied corrosion preventive compound to terminals. Secured hold-down clamp. Performed battery management system initialization per Ford workshop manual. Verified all electrical systems operating normally"
    ]
  },
  "Serpentine Belt Replacement": {
    concerns: [
      "Customer states squealing noise from engine area at startup especially in cold weather",
      "Customer states belt noise heard during acceleration from engine compartment",
      "Customer states serpentine belt is cracked and due for replacement per maintenance inspection",
      "Customer states power steering feels heavy and a squealing noise is present from the front of the engine",
      "Customer states air conditioning compressor cycles off and a chirping noise is heard from the belt area"
    ],
    conditions: [
      "Found serpentine drive belt exhibits cracking, glazing, and material loss on rib surfaces upon visual inspection",
      "Found Motorcraft JK series serpentine belt shows excessive wear with cracks exceeding 3mm depth per Ford belt wear gauge inspection",
      "Found serpentine belt tensioner unable to maintain proper belt tension. Belt shows signs of stretch and rib separation",
      "Found drive belt is frayed on edges and shows chunking on rib surface indicating belt is beyond service life per Ford inspection criteria",
      "Found serpentine belt chirp noise confirmed. Belt ribs are worn and glazed causing slip on accessory pulleys during load changes"
    ],
    corrections: [
      "Replaced serpentine drive belt with new Motorcraft JK series belt per Ford workshop manual procedure. Inspected all accessory pulleys for bearing roughness and alignment. Released belt tensioner and routed new belt per belt routing diagram. Verified proper belt tracking and tension",
      "Performed serpentine belt replacement. Removed worn belt using tensioner release procedure per Ford workshop manual. Inspected idler pulley and tensioner pulley bearings for noise or roughness. Installed new Motorcraft JK series belt per routing diagram. Verified belt tracks properly on all pulleys",
      "Replaced worn serpentine drive belt with Motorcraft JK series belt. Inspected automatic belt tensioner for proper operation and spring tension. Inspected all driven accessory pulleys for alignment and bearing condition. Installed new belt per Ford routing diagram. Started engine and verified no noise or misalignment",
      "Performed drive belt service per Ford workshop manual. Removed damaged serpentine belt and inspected all pulleys and belt tensioner assembly. Found tensioner operating within specification. Installed new Motorcraft JK series serpentine belt per belt routing label. Verified proper operation of all belt-driven accessories",
      "Replaced serpentine belt with new Motorcraft JK series belt. Rotated belt tensioner per Ford procedure and removed old belt. Inspected water pump pulley, alternator pulley, AC compressor pulley, and power steering pump pulley for bearing roughness or wobble. Installed new belt per routing diagram and verified quiet operation at idle and under load"
    ]
  },

  // ============================================
  // BRAKES
  // ============================================
  "Brake Pad Replacement": {
    concerns: [
      "Customer states grinding noise when applying brakes especially at low speed",
      "Customer states squealing noise from front brakes during normal braking",
      "Customer states brake pedal pulsation felt when stopping from highway speed",
      "Customer states brake warning indicator is illuminated on instrument cluster",
      "Customer states braking distance seems longer than normal and brake dust is excessive"
    ],
    conditions: [
      "Found front brake pads worn to minimum thickness of 2mm or less at all four pad positions. Brake pad wear indicators contacting rotors",
      "Found rear brake pad friction material worn below Ford minimum specification of 3mm. Brake pad wear sensors have activated warning on instrument cluster",
      "Found front brake pads worn unevenly with inboard pads at 1mm remaining. Caliper slide pins found dry causing uneven pad wear",
      "Found brake pads at end of service life with friction material at or below minimum thickness per Ford workshop manual specification",
      "Found front brake pads worn to wear indicator level. Brake dust buildup on wheels is consistent with pad material reaching end of life"
    ],
    corrections: [
      "Replaced front brake pads with new Motorcraft BR series brake pads per Ford workshop manual procedure. Cleaned and lubricated caliper slide pins with Motorcraft silicone brake caliper grease. Inspected rotors for thickness and runout. Bedded in new brake pads per Ford break-in procedure",
      "Performed rear brake pad replacement. Installed new Motorcraft BR series brake pads. Cleaned caliper brackets and slide pin bores. Applied Motorcraft caliper grease to slide pins and pad contact points. Retracted caliper pistons per Ford procedure. Verified brake pedal feel and tested brakes on road test",
      "Replaced front brake pads with Motorcraft BR series pads. Removed calipers and inspected caliper slide pins for corrosion and binding. Cleaned and re-greased slide pins with Motorcraft silicone grease. Cleaned pad contact ears on bracket. Installed new hardware and brake pads. Pumped brake pedal to seat pads. Road tested and verified proper operation",
      "Performed brake pad service. Removed wheels and calipers per Ford workshop manual. Replaced worn pads with new Motorcraft BR series pads. Measured rotor thickness and verified within specification. Lubricated all caliper contact points. Reassembled and torqued caliper brackets to specification. Performed brake burnish procedure per Ford recommendation",
      "Replaced brake pads with Motorcraft BR series friction pads per Ford workshop manual procedure. Inspected calipers for leaks and piston seal condition. Cleaned caliper mounting brackets with wire brush. Applied Motorcraft brake caliper grease to all contact surfaces. Verified brake fluid level in reservoir. Road tested to confirm quiet operation and proper stopping"
    ]
  },
  "Brake Rotor Replacement": {
    concerns: [
      "Customer states pulsation felt in brake pedal during braking from highway speeds",
      "Customer states steering wheel shakes when brakes are applied",
      "Customer states grinding and vibration from front brakes that has gotten progressively worse",
      "Customer states brakes feel rough and stopping distance has increased",
      "Customer states noise and vibration when stopping and brake rotors appear scored"
    ],
    conditions: [
      "Found front brake rotors below minimum thickness specification stamped on rotor casting. Rotors cannot be resurfaced and require replacement",
      "Found front brake rotor lateral runout exceeds Ford maximum specification of 0.050mm when measured with dial indicator per workshop manual procedure",
      "Found brake rotors have deep scoring and heat discoloration beyond resurfacing limits. Rotor thickness variation measured at 0.030mm exceeding Ford maximum specification",
      "Found rear brake rotors at or below minimum discard thickness. Rotor surfaces show heavy grooving and lateral runout exceeds specification per Ford workshop manual measurement procedure",
      "Found front brake rotors with hard spots and thickness variation causing pedal pulsation. Minimum thickness would be exceeded if resurfaced per micrometer measurement"
    ],
    corrections: [
      "Replaced front brake rotors with new Motorcraft BRRF series rotors per Ford workshop manual procedure. Cleaned new rotor surfaces with brake cleaner to remove protective coating. Installed new Motorcraft BR series brake pads. Torqued caliper brackets to specification. Performed brake burnish procedure",
      "Performed front brake rotor and pad replacement. Removed calipers and brackets. Replaced rotors with Motorcraft BRRF series units. Verified rotor runout within specification using dial indicator after installation. Installed new Motorcraft BR series brake pads. Lubricated caliper slides. Reassembled and torqued all fasteners to spec. Road tested",
      "Replaced rear brake rotors with Motorcraft BRRF series rotors. Measured new rotor runout at hub and verified within Ford specification of 0.050mm or less. Installed new brake pads and hardware. Cleaned and greased caliper slide pins. Torqued all fasteners per Ford workshop manual. Bedded in brakes per Ford recommended procedure",
      "Performed brake rotor replacement service. Removed wheels, calipers, and brackets per Ford workshop manual. Replaced both front rotors with new Motorcraft BRRF series units. Cleaned hub mounting surfaces to ensure proper rotor seating. Checked runout on each rotor with dial indicator. Installed Motorcraft BR series pads with new hardware. Reassembled and road tested",
      "Replaced brake rotors with new Motorcraft BRRF series rotors per Ford specification. Inspected wheel bearings and hub assemblies during service. Cleaned hub mating surfaces with abrasive disc to remove corrosion. Installed rotors and verified lateral runout within specification. Installed new Motorcraft BR series brake pads. Torqued caliper bracket bolts to spec. Performed break-in procedure per Ford recommendation"
    ]
  },
  "Brake Fluid Flush": {
    concerns: [
      "Customer states brake pedal feels soft or spongy when applying brakes",
      "Customer states increased stopping distance during normal braking",
      "Customer states brake pedal travels further than normal before engaging",
      "Customer states brakes feel inconsistent or grabby during operation",
      "Customer states brake warning indicator illuminated on instrument cluster"
    ],
    conditions: [
      "Found brake fluid contaminated with moisture content exceeding Ford specification; fluid has exceeded recommended service interval",
      "Found brake fluid test strip indicates moisture content above 3%; fluid degradation compromising braking system hydraulic integrity",
      "Found brake fluid discolored and at end of service life per Ford maintenance schedule; boiling point reduced below safe operating threshold",
      "Found brake fluid copper content elevated beyond serviceable limit per test strip analysis; fluid requires replacement per Ford guidelines",
      "Found brake fluid hygroscopic contamination present; fluid no longer meeting Ford WSS-M6C65-A2 specification for DOT 4 LV"
    ],
    corrections: [
      "Performed brake fluid flush per Ford service procedure; bled all four calipers and replaced with Motorcraft DOT 4 LV brake fluid to specification",
      "Performed complete brake hydraulic system flush; replaced fluid with Motorcraft PM-20 DOT 4 LV at all four corners per Ford workshop manual",
      "Performed brake fluid exchange service per Ford scheduled maintenance; flushed system and refilled with Motorcraft DOT 4 LV brake fluid",
      "Performed brake fluid flush and system bleed per Ford procedure; filled with Motorcraft DOT 4 LV and verified firm pedal feel",
      "Performed brake hydraulic fluid service; exchanged contaminated fluid with Motorcraft DOT 4 LV and road tested to confirm proper brake operation"
    ]
  },

  // ============================================
  // COOLING SYSTEM
  // ============================================
  "Coolant Flush": {
    concerns: [
      "Customer states engine temperature gauge reads higher than normal during driving",
      "Customer states heater is not blowing hot air into cabin as expected",
      "Customer states coolant warning light illuminated on instrument cluster",
      "Customer states noticed coolant discoloration during routine check",
      "Customer states engine overheating warning message displayed on dash"
    ],
    conditions: [
      "Found engine coolant degraded and discolored beyond manufacturer specification; coolant has exceeded Ford recommended service interval",
      "Found engine coolant pH level outside acceptable range per test strip analysis; corrosion inhibitors depleted beyond serviceable limit",
      "Found engine coolant contaminated with rust and particulate matter; coolant no longer providing adequate corrosion protection per Ford specification",
      "Found engine coolant freeze point and boiling point outside Ford specification range; coolant thermal protection compromised",
      "Found engine coolant at end of service life per Ford maintenance schedule; coolant no longer meeting Ford WSS-M97B51-A1 specification"
    ],
    corrections: [
      "Performed engine coolant flush per Ford service procedure; drained and replaced with Motorcraft Orange Prediluted Antifreeze/Coolant to specification",
      "Performed complete cooling system flush using Ford-approved equipment; refilled with Motorcraft VC-3DIL-B to proper level per Ford workshop manual",
      "Performed coolant exchange service per Ford scheduled maintenance; flushed system and filled with Motorcraft Orange Coolant to manufacturer specification",
      "Performed engine coolant flush and system inspection per Ford procedure; replaced with Motorcraft Orange Prediluted Coolant and verified no leaks present",
      "Performed cooling system fluid service; exchanged degraded coolant with Ford-specified Motorcraft Orange Coolant and verified proper fill level and cap seal"
    ]
  },
  "Water Pump Replacement": {
    concerns: [
      "Customer states coolant leak noticed under vehicle after parking overnight",
      "Customer states engine temperature gauge reads higher than normal during driving",
      "Customer states whining or grinding noise from front of engine increasing with RPM",
      "Customer states low coolant warning light is on and coolant level keeps dropping",
      "Customer states coolant smell from engine area and steam noticed from under the hood"
    ],
    conditions: [
      "Found coolant leak originating from water pump weep hole indicating internal seal failure. Coolant trail traced to pump housing",
      "Found engine water pump bearing has excessive play and produces audible noise when rotated by hand during inspection",
      "Found coolant residue and active drip at water pump mounting surface. Cooling system pressure test confirms leak at water pump gasket area",
      "Found water pump shaft wobble exceeds specification indicating bearing failure. Coolant seepage visible at weep hole per Ford diagnostic procedure",
      "Found engine water pump leaking externally from pump body casting. Cooling system pressure tested to 16 PSI per Ford specification and confirmed leak source at water pump"
    ],
    corrections: [
      "Replaced engine water pump per Ford workshop manual procedure. Drained cooling system and removed drive belt and associated components for access. Cleaned gasket mating surfaces on engine block. Installed new water pump with new gasket and sealant per Ford specification. Refilled cooling system with Motorcraft Orange Prediluted Coolant per Ford WSS-M97B44-D2. Bled air from system and verified no leaks",
      "Performed water pump replacement. Removed serpentine belt, coolant hoses, and mounting bolts per Ford workshop manual. Cleaned engine block mounting surface. Installed new water pump with new gasket torqued to specification. Reconnected all hoses and installed new drive belt. Filled with Motorcraft Prediluted Orange Coolant. Pressure tested system and verified no leaks. Road tested and monitored temperature gauge",
      "Replaced failed water pump per Ford workshop manual procedure. Drained cooling system into clean container. Removed necessary components for access. Removed failed pump and cleaned mating surface. Applied RTV sealant per Ford specification where required. Installed new water pump and gasket, torqued bolts to spec in proper sequence. Refilled with Motorcraft Orange Coolant per WSS-M97B44-D2. Bled cooling system and verified operating temperature normal",
      "Performed engine water pump service. Drained coolant and removed accessory drive belt. Removed water pump mounting bolts and extracted failed pump. Inspected timing cover and block surface for damage. Installed new water pump with new gasket per Ford workshop manual. Torqued fasteners to specification. Replaced thermostat housing O-ring while accessible. Filled with Motorcraft coolant and bled system. Verified no leaks at operating temperature",
      "Replaced water pump assembly per Ford workshop manual. Removed cooling fan, shroud, and drive belt for access. Removed failed pump and cleaned all gasket surfaces. Installed new water pump with Ford specified gasket and sealant. Torqued bolts to specification in recommended sequence. Reassembled all removed components. Refilled cooling system with Motorcraft Orange Prediluted Coolant meeting Ford WSS-M97B44-D2. Performed cooling system bleed procedure. Verified operating temperature and no leaks"
    ]
  },
  "Thermostat Replacement": {
    concerns: [
      "Customer states engine takes a long time to reach normal operating temperature",
      "Customer states heater blows lukewarm air and temperature gauge stays low",
      "Customer states engine temperature gauge fluctuates erratically during normal driving",
      "Customer states engine overheats in traffic but temperature drops on highway",
      "Customer states check engine light is on with a temperature related code"
    ],
    conditions: [
      "Found engine thermostat stuck in open position. Engine fails to reach normal operating temperature of 190-210 degrees within Ford specified warm-up period",
      "Found engine coolant temperature below normal operating range. Scan tool data shows ECT sensor reading 155 degrees after extended idle consistent with thermostat stuck open",
      "Found DTC P0128 stored in PCM indicating coolant temperature below thermostat regulating temperature. Thermostat Motorcraft RT-1236 has failed",
      "Found thermostat stuck partially closed causing coolant flow restriction. Engine temperature spikes in low speed driving and drops at highway speed consistent with thermostat malfunction",
      "Found engine thermostat housing leaking coolant at gasket surface. Thermostat tested per Ford procedure and found not opening at rated temperature"
    ],
    corrections: [
      "Replaced engine thermostat with new Motorcraft RT-1236 per Ford workshop manual procedure. Drained cooling system to below thermostat level. Removed thermostat housing and old gasket. Cleaned mating surfaces. Installed new thermostat and gasket. Torqued housing bolts to specification. Refilled with Motorcraft Orange Prediluted Coolant per WSS-M97B44-D2. Bled cooling system and verified proper temperature regulation",
      "Performed thermostat replacement. Removed thermostat housing per Ford workshop manual. Removed failed thermostat and cleaned housing and engine mating surfaces. Installed new Motorcraft RT-1236 thermostat with new O-ring seal. Torqued housing fasteners to spec. Refilled coolant and bled system. Cleared DTC P0128 from PCM. Road tested and verified engine reaches operating temperature within specification",
      "Replaced engine thermostat with Motorcraft RT-1236. Partially drained cooling system and removed upper radiator hose and thermostat housing. Cleaned gasket surfaces and inspected housing for cracks or corrosion. Installed new thermostat ensuring jiggle valve is positioned per Ford workshop manual. Reassembled with new gasket. Refilled and bled cooling system. Verified operating temperature between 190-210 degrees",
      "Performed thermostat service per Ford workshop manual procedure. Drained coolant below thermostat housing level. Removed housing bolts and extracted failed thermostat. Cleaned all sealing surfaces. Installed new Motorcraft RT-1236 thermostat and new gasket per Ford specification. Torqued housing bolts to spec. Refilled cooling system with Motorcraft Orange Coolant meeting WSS-M97B44-D2. Bled air from system. Cleared DTCs and road tested to verify normal operating temperature",
      "Replaced thermostat with new Motorcraft RT-1236 per Ford specification. Removed necessary coolant hoses and thermostat housing. Inspected coolant passages for debris or corrosion. Installed new thermostat with correct orientation and new sealing gasket. Reassembled housing and reconnected hoses. Filled with Motorcraft Prediluted Orange Coolant per Ford WSS-M97B44-D2. Performed cooling system air bleed procedure. Verified temperature gauge reads in normal range and heater output is adequate"
    ]
  },
  "Radiator Replacement": {
    concerns: [
      "Customer states coolant is leaking from front of vehicle and puddle is found after parking",
      "Customer states vehicle overheats in stop and go traffic and coolant level is low",
      "Customer states radiator appears to have a visible crack on the plastic end tank",
      "Customer states coolant loss requires frequent topping off and no other leaks are visible",
      "Customer states transmission fluid appears milky and coolant level is dropping"
    ],
    conditions: [
      "Found radiator leaking coolant from cracked plastic end tank on driver side. Cooling system pressure test to 16 PSI confirms leak at radiator tank seam",
      "Found radiator core has multiple leaking tubes identified during pressure test. Coolant seepage visible at core face area. Radiator is not repairable and requires replacement",
      "Found radiator end tank separated from core at crimp joint. Active coolant leak confirmed during pressure test per Ford diagnostic procedure",
      "Found transmission cooler internal to radiator has failed allowing coolant and transmission fluid to cross-contaminate. Transmission fluid appears milky confirming internal radiator failure",
      "Found radiator fins heavily corroded and multiple core tubes are seeping coolant. Pressure test confirms leak rate exceeds acceptable loss. Radiator is beyond repair and requires replacement"
    ],
    corrections: [
      "Replaced radiator assembly per Ford workshop manual procedure. Drained cooling system and recovered coolant. Removed cooling fan assembly, upper and lower radiator hoses, and transmission cooler lines. Installed new radiator and reconnected all hoses and lines. Refilled cooling system with Motorcraft Orange Prediluted Coolant per Ford WSS-M97B44-D2. Bled system and verified no leaks at operating temperature",
      "Performed radiator replacement. Removed cooling fan shroud and fan assembly. Disconnected upper and lower hoses and transmission cooler lines. Extracted failed radiator and installed new unit. Reconnected all hoses, cooler lines, and fan assembly. Filled system with Motorcraft Prediluted Orange Coolant meeting WSS-M97B44-D2. Bled cooling system and pressure tested. Verified no leaks and proper operating temperature",
      "Replaced failed radiator assembly per Ford workshop manual. Drained and recovered engine coolant. Removed air dam and radiator support components for access. Disconnected all hoses and transmission cooler lines. Installed new radiator with new mounting bushings. Reconnected all coolant hoses with new clamps where required. Refilled with Motorcraft Orange Coolant per WSS-M97B44-D2 specification. Bled air from system. Pressure tested to 16 PSI and verified no leaks",
      "Performed radiator replacement service. Evacuated cooling system. Removed upper radiator support, fan assembly, and all connected hoses. Installed new radiator and secured with mounting hardware. Reconnected all hoses and transmission cooler lines. Refilled with Motorcraft Prediluted Orange Coolant per Ford WSS-M97B44-D2. Performed air bleed procedure per Ford workshop manual. Verified no leaks and proper temperature regulation",
      "Replaced radiator due to internal transmission cooler failure per Ford workshop manual. Drained cooling system and transmission fluid. Removed radiator assembly and flushed transmission cooler lines to remove cross-contaminated fluid. Installed new radiator with integral transmission cooler. Refilled cooling system with Motorcraft Orange Coolant per WSS-M97B44-D2. Refilled transmission with Motorcraft MERCON ULV per Ford specification. Bled cooling system. Pressure tested and verified no leaks. Road tested to verify proper cooling and transmission operation"
    ]
  },

  // ============================================
  // TRANSMISSION & DRIVETRAIN
  // ============================================
  "Transmission Flush": {
    concerns: [
      "Customer states transmission shifts hard between gears",
      "Customer states vehicle hesitates when accelerating from a stop",
      "Customer states transmission slips intermittently during normal driving",
      "Customer states delayed engagement when shifting from Park to Drive",
      "Customer states rough or shuddering sensation during gear changes"
    ],
    conditions: [
      "Found automatic transmission fluid dark and discolored beyond manufacturer specification; fluid has exceeded service interval",
      "Found automatic transmission fluid contaminated with particulate matter; fluid viscosity outside Ford specification range",
      "Found automatic transmission fluid at end of service life per Ford maintenance schedule; fluid thermal degradation present",
      "Found automatic transmission fluid oxidized and beyond serviceable condition; fluid no longer meeting Ford WSS-M2C924-A specification",
      "Found automatic transmission fluid breakdown causing degraded shift quality; fluid analysis indicates service required"
    ],
    corrections: [
      "Performed automatic transmission fluid exchange per Ford service procedure; drained and replaced with Motorcraft MERCON ULV fluid to manufacturer specification",
      "Performed complete transmission fluid flush using Ford-approved equipment; filled with Motorcraft MERCON ULV to proper level per dipstick/fill procedure",
      "Performed transmission fluid service per Ford scheduled maintenance; exchanged fluid with Motorcraft MERCON ULV and verified proper fill level",
      "Performed automatic transmission fluid exchange and filter inspection per Ford workshop manual; refilled with Motorcraft MERCON ULV to specification",
      "Performed transmission fluid flush service; replaced with Ford-specified Motorcraft MERCON ULV fluid and road tested to verify proper shift quality"
    ]
  },
  "Transmission Repair": {
    concerns: [
      "Customer states transmission will not shift out of first gear",
      "Customer states check engine light on with harsh shifting from transmission",
      "Customer states vehicle goes into limp mode during normal driving",
      "Customer states complete loss of forward or reverse gear engagement",
      "Customer states transmission makes loud mechanical noise during gear changes"
    ],
    conditions: [
      "Found diagnostic trouble codes stored in PCM related to transmission operation; internal transmission component failure confirmed per Ford diagnostic procedure",
      "Found transmission solenoid body assembly malfunction per Ford PID/diagnostic data; solenoid performance outside specification during active testing",
      "Found transmission clutch pack failure per Ford diagnostic procedure; clutch apply pressure and slip data outside specification during road test",
      "Found transmission valve body malfunction confirmed per Ford workshop manual diagnostic flowchart; hydraulic pressure test results outside specification",
      "Found internal transmission mechanical failure per Ford diagnostic procedure; teardown inspection reveals worn/damaged components requiring repair"
    ],
    corrections: [
      "Removed and rebuilt automatic transmission per Ford workshop manual; replaced failed internal components and all seals; refilled with Motorcraft MERCON ULV and road tested to verify repair",
      "Replaced transmission solenoid body assembly per Ford service procedure; cleared DTCs, performed TCM adaptive relearn, and road tested to verify proper shift quality",
      "Replaced transmission clutch pack assembly per Ford workshop manual; reassembled transmission with new seals and Motorcraft MERCON ULV; performed adaptive relearn and road tested",
      "Replaced transmission valve body per Ford service procedure; installed new gaskets and refilled with Motorcraft MERCON ULV; performed TCM reset and road tested to confirm repair",
      "Replaced automatic transmission assembly with Ford-remanufactured unit per workshop manual; filled with Motorcraft MERCON ULV, performed TCM adaptive relearn, and road tested to verify"
    ]
  },
  "Front Differential Flush": {
    concerns: [
      "Customer states whining or humming noise coming from front of vehicle during driving",
      "Customer states vibration felt through steering wheel during acceleration",
      "Customer states grinding sensation from front end when turning at low speeds",
      "Customer states front drivetrain noise increases with vehicle speed",
      "Customer states unusual noise from front axle area during four-wheel drive operation"
    ],
    conditions: [
      "Found front differential fluid dark and discolored beyond manufacturer specification; fluid has exceeded Ford recommended service interval",
      "Found front differential fluid contaminated with metallic particulate; fluid viscosity degraded beyond Ford serviceable specification",
      "Found front differential fluid at end of service life per Ford maintenance schedule; fluid thermal breakdown present",
      "Found front differential gear oil oxidized and beyond serviceable condition; fluid no longer meeting Ford WSS-M2C200-D2 specification",
      "Found front differential fluid analysis indicates excessive wear material present; fluid change required per Ford service guidelines"
    ],
    corrections: [
      "Performed front differential fluid exchange per Ford service procedure; drained and replaced with Motorcraft SAE 80W-90 gear oil to manufacturer specification",
      "Performed front differential fluid service per Ford workshop manual; refilled with Ford-specified Motorcraft gear lubricant to proper level",
      "Performed front differential flush per Ford scheduled maintenance; exchanged fluid with Motorcraft SAE 80W-90 and verified proper fill level at check plug",
      "Performed front differential gear oil replacement per Ford procedure; filled with Motorcraft gear lubricant to specification and inspected for leaks",
      "Performed front axle differential fluid service; replaced with Ford-specified Motorcraft gear oil and road tested to verify proper operation"
    ]
  },
  "Rear Differential Flush": {
    concerns: [
      "Customer states whining or howling noise from rear of vehicle during driving",
      "Customer states clunking noise from rear end during acceleration or deceleration",
      "Customer states vibration felt from rear of vehicle at highway speeds",
      "Customer states rear drivetrain noise present during turns or cornering",
      "Customer states growling sound from rear axle area that increases with speed"
    ],
    conditions: [
      "Found rear differential fluid dark and degraded beyond manufacturer specification; fluid has exceeded Ford recommended service interval",
      "Found rear differential fluid contaminated with metallic particulate matter; fluid viscosity outside Ford specification range",
      "Found rear differential fluid at end of service life per Ford maintenance schedule; fluid thermal degradation compromising lubrication",
      "Found rear differential gear oil oxidized beyond serviceable condition; fluid no longer meeting Ford WSS-M2C200-D2 specification",
      "Found rear differential fluid analysis indicates wear debris present; fluid replacement required per Ford service guidelines"
    ],
    corrections: [
      "Performed rear differential fluid exchange per Ford service procedure; drained and replaced with Motorcraft SAE 75W-140 synthetic gear oil to specification",
      "Performed rear differential fluid service per Ford workshop manual; refilled with Ford-specified Motorcraft synthetic gear lubricant to proper level",
      "Performed rear differential flush per Ford scheduled maintenance; exchanged fluid with Motorcraft SAE 75W-140 and verified fill level at check plug",
      "Performed rear differential gear oil replacement per Ford procedure; filled with Motorcraft synthetic gear lubricant and inspected for leaks",
      "Performed rear axle differential fluid service; replaced with Ford-specified Motorcraft synthetic gear oil and road tested to verify quiet operation"
    ]
  },
  "Transfer Case Flush": {
    concerns: [
      "Customer states grinding or chattering noise when engaging four-wheel drive",
      "Customer states difficulty shifting between 2WD and 4WD modes",
      "Customer states vibration or shudder during four-wheel drive operation",
      "Customer states transfer case warning indicator illuminated on dash",
      "Customer states noise from center of vehicle during low-speed four-wheel drive maneuvers"
    ],
    conditions: [
      "Found transfer case fluid dark and discolored beyond manufacturer specification; fluid has exceeded Ford recommended service interval",
      "Found transfer case fluid contaminated with particulate matter; fluid viscosity degraded beyond Ford serviceable specification",
      "Found transfer case fluid at end of service life per Ford maintenance schedule; fluid no longer providing adequate lubrication",
      "Found transfer case fluid oxidized beyond serviceable condition; fluid no longer meeting Ford WSS-M2C200-D2 specification",
      "Found transfer case fluid thermal breakdown present; fluid analysis indicates service required per Ford guidelines"
    ],
    corrections: [
      "Performed transfer case fluid exchange per Ford service procedure; drained and replaced with Motorcraft transfer case fluid to manufacturer specification",
      "Performed transfer case fluid service per Ford workshop manual; refilled with Ford-specified Motorcraft fluid to proper level at fill plug",
      "Performed transfer case flush per Ford scheduled maintenance; exchanged fluid with Motorcraft transfer case fluid and verified proper fill level",
      "Performed transfer case fluid replacement per Ford procedure; filled with Motorcraft fluid to specification and verified smooth 4WD engagement",
      "Performed transfer case fluid service; replaced with Ford-specified Motorcraft fluid and road tested to verify proper four-wheel drive operation"
    ]
  },

  // ============================================
  // FUEL SYSTEM
  // ============================================
  "Fuel Pump Replacement": {
    concerns: [
      "Customer states vehicle cranks but will not start",
      "Customer states vehicle stalls intermittently while driving at highway speeds",
      "Customer states engine sputters and loses power under acceleration",
      "Customer states vehicle hesitates on startup and fuel gauge reads erratically",
      "Customer states whining noise coming from rear of vehicle when ignition is on"
    ],
    conditions: [
      "Found fuel pressure at 12 PSI, specification calls for 39-65 PSI per Ford workshop manual. Fuel pump module not operating correctly",
      "Found no fuel pressure at fuel rail service port. Confirmed 12V power supply to fuel pump driver module. Fuel pump inoperative",
      "Found intermittent fuel pressure drop during loaded engine test. Fuel pump amperage draw exceeds specification per Ford diagnostic procedure",
      "Found fuel pump relay and fuse OK. Confirmed fuel pump has no output using scan tool fuel pump command test. Pump assembly failed internally",
      "Found excessive fuel pump current draw at 8.2 amps, specification is 3-5 amps. Fuel pump module assembly worn beyond serviceable limits"
    ],
    corrections: [
      "Replaced fuel pump module assembly with Motorcraft PFS-573. Depressurized fuel system per Ford workshop manual procedure. Verified fuel pressure at 55 PSI within specification. Road tested and confirmed proper operation",
      "Replaced in-tank fuel pump module assembly with Motorcraft part. Cleaned fuel tank and inspected for debris. Verified fuel pressure and volume meet Ford specification. No DTCs present after repair",
      "Performed fuel pump module replacement per Ford workshop manual. Replaced fuel pump strainer and rubber isolators. Verified fuel pressure at 58 PSI at idle and 50 PSI under load. System operating as designed",
      "Replaced fuel pump module assembly. Inspected fuel tank for contamination, tank clean. Cycled ignition and confirmed fuel pressure builds to specification within 2 seconds. Road tested 10 miles, no stalling",
      "Replaced fuel pump module assembly with Motorcraft PFS series unit. Replaced fuel pump lock ring seal. Verified no leaks present. Fuel pressure steady at 55 PSI, current draw at 4 amps within specification"
    ]
  },
  "Fuel Filter Replacement": {
    concerns: [
      "Customer states vehicle has reduced power and poor acceleration",
      "Customer states engine stumbles at highway speed and feels restricted",
      "Customer states hard starting condition especially after vehicle sits overnight",
      "Customer states fuel economy has decreased noticeably over the last several weeks",
      "Customer states engine misfires under heavy load and check engine light is on"
    ],
    conditions: [
      "Found fuel pressure at rail is 28 PSI, specification is 39-65 PSI. Fuel pressure recovers when pump runs continuously. Inline fuel filter restricted",
      "Found restricted fuel flow during volume test. Fuel filter has not been replaced per maintenance records. Filter shows external corrosion and sediment buildup",
      "Found fuel pressure drops below specification during high-demand engine operation. Fuel pump output is within specification at pump. Inline fuel filter is flow restricted",
      "Found fuel filter exceeds recommended service interval. Pressure drop across filter is 8 PSI, specification is less than 3 PSI per Ford workshop manual",
      "Found fuel volume delivery below specification during cranking. Disconnected fuel filter and confirmed pump output is adequate. Fuel filter plugged with debris"
    ],
    corrections: [
      "Replaced inline fuel filter with Motorcraft FG-1083 per Ford scheduled maintenance procedure. Depressurized fuel system prior to service. Verified fuel pressure at 55 PSI and no leaks present",
      "Performed fuel filter replacement per Ford workshop manual. Inspected fuel lines and fittings for damage or corrosion. Confirmed fuel pressure and volume within specification after service. Road tested vehicle",
      "Replaced fuel filter with Motorcraft OE specification part. Cleaned fuel line quick-connect fittings and inspected for damage. Verified no leaks. Fuel pressure at rail measures 56 PSI within specification",
      "Replaced inline fuel filter. Depressurized system per safety procedure. Installed new push-connect retainers on fuel lines. Verified fuel pressure at idle and under load meets Ford specification",
      "Performed fuel filter replacement with Motorcraft FG series filter. Inspected fuel lines for chafing or deterioration. Started vehicle and verified no fuel leaks. Pressure drop across filter now less than 1 PSI"
    ]
  },
  "Fuel Injector Service": {
    concerns: [
      "Customer states engine runs rough at idle and check engine light is on",
      "Customer states vehicle misfires on cold startup and smells of fuel",
      "Customer states poor fuel economy and lack of power during acceleration",
      "Customer states engine shakes at idle and exhaust smells rich",
      "Customer states intermittent misfire and engine hesitation at low RPM"
    ],
    conditions: [
      "Found DTC P0302 cylinder 2 misfire. Performed injector balance test per Ford workshop manual, cylinder 2 injector flow rate 18% below specification. Injector failed",
      "Found DTCs P0171 and P0174 system too lean both banks. Fuel injector flow test reveals two injectors with restricted spray pattern. Carbon deposits observed on injector tips",
      "Found DTC P0201 injector circuit cylinder 1. Confirmed injector coil resistance at 16.5 ohms, specification is 11-18 ohms. Injector pintle stuck closed, no fuel delivery on command test",
      "Found misfire counts on cylinders 1, 3, and 5 via scan tool. Injector flow balance test shows injectors flowing 12-15% below specification. Carbon buildup restricting injector nozzles",
      "Found fuel trim values at positive 22% long term, specification is plus or minus 10%. Performed injector leak-down test, cylinders 2 and 4 injectors leaking fuel past pintle seats"
    ],
    corrections: [
      "Replaced fuel injector on cylinder 2 with Motorcraft CM-5248 per Ford workshop manual. Replaced injector O-ring seals. Cleared DTCs, performed idle relearn. Confirmed no misfires after 15-minute run time",
      "Performed fuel injector cleaning service using Ford approved fuel system cleaner. Ultrasonic cleaned injector assemblies per Ford technical service procedure. Reinstalled and verified flow balance within 2% across all cylinders",
      "Replaced cylinder 1 fuel injector with Motorcraft OE specification unit. Replaced upper and lower injector O-rings with Motorcraft seals. Cleared DTCs and verified injector operation via scan tool bi-directional test",
      "Performed professional fuel injector flow bench service on all six injectors. Cleaned carbon deposits and restored spray pattern to specification. Replaced all injector O-ring seals. Fuel trims returned to plus or minus 3%",
      "Replaced leaking fuel injectors on cylinders 2 and 4 with Motorcraft units. Replaced fuel rail O-rings and clips. Verified no fuel leaks with engine running. Cleared DTCs, fuel trims within specification after drive cycle"
    ]
  },

  // ============================================
  // AC & CLIMATE
  // ============================================
  "AC Recharge": {
    concerns: [
      "Customer states air conditioning is blowing warm air from all vents",
      "Customer states AC cools intermittently then blows warm on hot days",
      "Customer states air conditioning is not as cold as it used to be",
      "Customer states AC takes a long time to cool down the cabin after sitting in the sun",
      "Customer states musty smell from vents when AC is turned on and cooling is weak"
    ],
    conditions: [
      "Found AC system low side pressure at 58 PSI and high side at 120 PSI with ambient temperature of 90 degrees. System undercharged. Specification per Ford workshop manual is 30-40 PSI low side and 200-250 PSI high side",
      "Found AC refrigerant charge level 8 oz low using refrigerant identifier. Performed electronic leak detection per Ford procedure, no active leaks detected at this time",
      "Found AC system refrigerant 12 oz undercharged using recovery and recharge equipment. UV dye inspection reveals minor seepage at high side service port Schrader valve",
      "Found AC vent temperature at 68 degrees, specification is 38-48 degrees per Ford workshop manual. System pressure readings indicate low refrigerant charge. R-1234yf system",
      "Found AC system 6 oz low on R-1234yf refrigerant. Compressor cycling rapidly on low pressure cutoff switch. No UV dye leaks found during visual inspection at this time"
    ],
    corrections: [
      "Performed AC system recovery, vacuum, and recharge per Ford workshop manual. Evacuated system to 29.9 inHg for 30 minutes to verify no leaks. Recharged with 28 oz R-134a to Ford specification. Vent temperature now 42 degrees",
      "Performed AC system recharge with R-134a refrigerant to Ford specification of 28 oz. Added UV dye for future leak detection. Verified vent temperature at 40 degrees. High side 225 PSI and low side 32 PSI within specification",
      "Replaced high side Schrader valve and service port cap. Performed AC system evacuation for 45 minutes and recharged with R-134a to Ford specification. Verified no leaks with electronic detector. Vent temperature 39 degrees",
      "Performed AC system recovery and recharge with R-1234yf refrigerant to Ford WSS-M17B1-A specification. Evacuated system and held vacuum for 30 minutes, no pressure rise. Vent temperature at center vent 41 degrees at 90 degree ambient",
      "Performed AC refrigerant recovery and recharge per Ford procedure. Charged system with 22 oz R-1234yf to specification. Injected UV dye per Ford WSS procedure. Compressor operating normally, vent temperature at 43 degrees. Recommend recheck in 30 days"
    ]
  },
  "AC Compressor Replacement": {
    concerns: [
      "Customer states loud grinding noise from engine area when AC is turned on",
      "Customer states AC stopped blowing cold air and heard a loud clunk from the engine",
      "Customer states AC clutch engages but system does not cool and makes rattling noise",
      "Customer states burning smell from under hood when running AC and air is warm",
      "Customer states AC compressor seized and serpentine belt is squealing"
    ],
    conditions: [
      "Found AC compressor clutch bearing seized. Compressor shaft will not rotate by hand. Metallic debris found in refrigerant system during recovery. Compressor failed internally",
      "Found AC compressor not building pressure. High side reads 85 PSI and low side reads 80 PSI with system fully charged. Compressor internal reed valves failed per Ford diagnostic procedure",
      "Found AC compressor leaking refrigerant from shaft seal. UV dye confirmed at compressor front seal area. System empty. Compressor clutch has excessive play indicating bearing failure",
      "Found AC compressor locked up. Serpentine belt glazed and damaged from slipping on seized compressor pulley. Metal contamination found in recovered refrigerant oil sample",
      "Found AC compressor making internal knocking noise when engaged. Discharge pressure fluctuating between 150-280 PSI erratically. Compressor has internal mechanical failure"
    ],
    corrections: [
      "Replaced AC compressor assembly with Motorcraft YC-2555 per Ford workshop manual. Replaced accumulator/drier with Motorcraft YF-37516. Flushed condenser and evaporator to remove debris. Added correct PAG oil charge. Evacuated and recharged system to specification. Vent temperature 40 degrees",
      "Replaced AC compressor and receiver/drier assembly per Ford workshop manual. Replaced orifice tube, found debris in screen. Flushed all AC lines and condenser per Ford contamination procedure. Recharged with R-134a to specification. System operating correctly",
      "Replaced AC compressor with Motorcraft remanufactured unit. Replaced accumulator/drier with Motorcraft part. Replaced compressor shaft seal and clutch assembly. Added correct oil charge per Ford specification. Evacuated and recharged system. No leaks detected",
      "Replaced seized AC compressor with Motorcraft assembly. Replaced serpentine belt with Motorcraft JK-series belt. Replaced receiver/drier and expansion valve. Flushed entire system per Ford metal contamination procedure. Recharged and verified vent temperature at 42 degrees",
      "Replaced AC compressor assembly per Ford workshop manual procedure. Replaced accumulator/drier. Drained and measured old compressor oil, added correct PAG 46 oil charge to new compressor per Ford specification. Evacuated system 45 minutes and recharged. Verified pressures and vent temperature within specification"
    ]
  },

  // ============================================
  // STEERING & SUSPENSION
  // ============================================
  "Wheel Alignment": {
    concerns: [
      "Customer states vehicle pulls to the right while driving on a straight road",
      "Customer states steering wheel is off center when driving straight",
      "Customer states tires are wearing unevenly on the inside edges",
      "Customer states vehicle wanders on the highway and does not track straight",
      "Customer states vibration in steering wheel and tires are cupping on the front"
    ],
    conditions: [
      "Found front toe out of specification at positive 0.32 degrees, Ford specification is 0.00 to positive 0.10 degrees. Rear camber at negative 2.1 degrees, specification is negative 0.5 to negative 1.5 degrees",
      "Found left front camber at negative 1.8 degrees and right front camber at negative 0.6 degrees. Cross camber exceeds Ford maximum specification of 0.50 degrees. Steering wheel off center 15 degrees left",
      "Found total front toe at positive 0.45 degrees, specification is positive 0.10 to positive 0.20 degrees. Rear thrust angle at 0.18 degrees. Inner tire edges show accelerated wear pattern consistent with toe misalignment",
      "Found all four wheel alignment angles out of Ford specification. Front caster split at 1.2 degrees, maximum specification is 0.50 degrees. Vehicle requires four-wheel alignment adjustment",
      "Found right front toe at positive 0.25 degrees and left front toe at negative 0.08 degrees. Individual toe out of specification causing tire cupping pattern. Thrust angle at 0.22 degrees requiring rear adjustment"
    ],
    corrections: [
      "Performed four-wheel alignment per Ford workshop manual specifications. Adjusted front toe to positive 0.10 degrees. Adjusted rear camber to negative 1.0 degrees using cam bolts. All angles now within Ford specification. Road tested and vehicle tracks straight",
      "Performed four-wheel alignment using Ford specified target values. Adjusted front camber using cam bolt procedure to negative 1.0 degrees both sides. Set front toe to specification. Centered steering wheel. All readings within Ford specification",
      "Performed four-wheel alignment per Ford workshop manual. Set rear thrust angle to 0.00 degrees. Adjusted front toe to positive 0.15 degrees total. All alignment angles within specification. Recommend tire rotation to address existing wear pattern",
      "Performed four-wheel alignment. Adjusted front caster using slotted strut mount to bring caster split within 0.25 degrees. Set front and rear toe and camber to Ford specification center values. Vehicle tracks straight on road test",
      "Performed four-wheel alignment per Ford specification. Adjusted rear toe to correct thrust angle to 0.02 degrees. Set front individual toe to positive 0.05 degrees each side. Printed alignment report showing all values within Ford specification. Road tested 5 miles"
    ]
  },
  "Power Steering Flush": {
    concerns: [
      "Customer states whining noise from power steering pump when turning the wheel",
      "Customer states steering feels stiff at low speeds and groans when turning",
      "Customer states power steering fluid is dark and has not been changed",
      "Customer states steering wheel is hard to turn in cold weather and fluid is discolored",
      "Customer states intermittent loss of power assist and noise from steering area"
    ],
    conditions: [
      "Found power steering fluid dark brown and contaminated. Fluid has burnt odor. Motorcraft MERCON LV specification fluid required per Ford WSS-M2C938-A. Fluid condition is degraded beyond serviceable limits",
      "Found power steering fluid discolored with visible particulate contamination. Power steering pump producing cavitation noise indicating aerated or degraded fluid. System requires fluid exchange",
      "Found power steering fluid level low and remaining fluid is black with metallic particles. Reservoir screen partially blocked with debris. Fluid does not meet Ford MERCON LV specification",
      "Found power steering pump whine increases with steering input. Fluid is dark and oxidized. No external leaks detected. Fluid condition causing increased pump wear and noise generation",
      "Found power steering fluid viscosity degraded, fluid is thin and discolored. Steering effort is increased at low speeds. Power steering system requires complete fluid exchange per Ford maintenance procedure"
    ],
    corrections: [
      "Performed power steering fluid exchange per Ford workshop manual procedure. Flushed system with Motorcraft MERCON LV fluid meeting Ford WSS-M2C938-A specification. Cycled steering lock to lock to purge old fluid. Verified proper fluid level and no leaks. Steering noise eliminated",
      "Performed complete power steering system flush. Removed and cleaned power steering reservoir and screen. Filled system with Motorcraft MERCON LV per Ford specification. Bled system of air by cycling steering. No noise present after service",
      "Performed power steering fluid exchange using Motorcraft MERCON LV meeting Ford WSS-M2C938-A specification. Disconnected return line and flushed until fluid runs clean. Inspected hoses and connections for leaks. Steering assist fully restored, no noise",
      "Performed power steering flush per Ford service procedure. Exchanged 2 quarts of fluid until clean Motorcraft MERCON LV is circulating. Checked pump pressure meets specification. Steering effort normal at all speeds. No whine or groan present",
      "Performed power steering system fluid exchange with Motorcraft MERCON LV fluid. Cleaned reservoir and inspected inlet screen. Verified fluid level correct after bleeding air from system. Power steering assist operating as designed, no abnormal noise on road test"
    ]
  },
  "Shock/Strut Replacement": {
    concerns: [
      "Customer states vehicle bounces excessively over bumps and feels unstable",
      "Customer states clunking noise from front suspension when driving over rough roads",
      "Customer states rear of vehicle sways and feels loose during lane changes",
      "Customer states oil leaking from front struts and ride quality has deteriorated",
      "Customer states vehicle nose dives severely when braking and bottoms out over bumps"
    ],
    conditions: [
      "Found front strut assemblies leaking hydraulic fluid from shaft seals. Bounce test shows more than 3 oscillations before settling. Struts have exceeded useful service life per Ford inspection criteria",
      "Found right front strut mount bearing cracked and strut shaft loose in upper mount. Strut boot torn and bump stop deteriorated. Left front strut also leaking. Both front strut assemblies require replacement",
      "Found rear shock absorbers leaking oil from piston shaft seals. Rear suspension has excessive travel with no damping resistance. Shock absorbers failed per Ford workshop manual jounce and rebound test",
      "Found front strut assemblies with visible fluid weeping past shaft seals and dust boots saturated with oil. Upper strut mount bearings binding when turned. Ride height within specification",
      "Found both rear shock absorbers have no damping resistance when manually compressed. Rubber bushings cracked and deteriorated. Shock absorbers non-functional requiring replacement"
    ],
    corrections: [
      "Replaced both front strut assemblies with Motorcraft ASH-24618 complete strut units per Ford workshop manual. Torqued upper strut mount nuts to 85 ft-lbs and lower pinch bolt to 129 ft-lbs per Ford specification. Performed four-wheel alignment. Road tested and ride quality restored",
      "Replaced both front strut assemblies with Motorcraft quick-strut units including upper mount bearings and coil springs. Replaced strut dust boots and bump stops. Torqued all fasteners to Ford specification. Performed wheel alignment. No noise on road test",
      "Replaced both rear shock absorbers with Motorcraft ASH series units per Ford workshop manual. Torqued upper mounting nuts to 30 ft-lbs and lower bolts to 85 ft-lbs per Ford specification. Road tested over rough surface, damping and ride control restored",
      "Replaced both front complete strut assemblies per Ford workshop manual procedure. New assemblies include strut mount bearings, coil springs, and bump stops. Torqued all hardware to Ford specification. Performed four-wheel alignment. Vehicle rides and handles as designed",
      "Replaced both rear shock absorbers with Motorcraft units. Replaced shock absorber mounting bushings upper and lower. Torqued all fasteners to Ford specification. Road tested vehicle over varied road surfaces. Damping control and ride quality restored to specification"
    ]
  },
  "Control Arm Replacement": {
    concerns: [
      "Customer states clunking noise from front suspension when going over bumps",
      "Customer states steering feels loose and vehicle wanders at highway speed",
      "Customer states knocking noise when braking and accelerating from a stop",
      "Customer states front end clunks when turning into driveways or over speed bumps",
      "Customer states uneven front tire wear and vehicle pulls under braking"
    ],
    conditions: [
      "Found lower control arm bushing cracked and separated on right front. Excessive movement observed during loaded suspension check. Bushing deteriorated beyond serviceable limit per Ford inspection criteria",
      "Found left front lower control arm ball joint has 3mm vertical play, Ford specification is zero freeplay. Ball joint boot torn and grease contaminated. Control arm assembly requires replacement",
      "Found both front lower control arm bushings have excessive radial play. Bushings are oil soaked and deteriorated. Movement exceeds Ford maximum allowable specification during dry park check",
      "Found right front lower control arm bent from impact damage. Ball joint binding during articulation test. Control arm and ball joint assembly damaged and requires replacement per Ford workshop manual",
      "Found upper control arm bushings cracked and separating on both sides. Alignment camber out of specification and not adjustable with current bushing condition. Control arms require replacement to restore alignment"
    ],
    corrections: [
      "Replaced right front lower control arm assembly with Motorcraft MEF-267 per Ford workshop manual. Torqued control arm pivot bolt to 148 ft-lbs and ball joint pinch bolt to 46 ft-lbs per Ford specification. Performed four-wheel alignment. No noise on road test",
      "Replaced left front lower control arm and ball joint assembly with Motorcraft unit. Installed new ball joint pinch bolt per Ford procedure, bolt is one-time use. Torqued all fasteners to specification. Performed wheel alignment. Road tested, no looseness or clunking",
      "Replaced both front lower control arm assemblies per Ford workshop manual. Torqued pivot bolts and ball joint hardware to Ford specification with vehicle at ride height. Performed four-wheel alignment. All values within specification. Road tested over bumps, no noise",
      "Replaced right front lower control arm assembly with Motorcraft part. Inspected knuckle ball joint bore for damage, bore within specification. Installed new pinch bolt and torqued to Ford specification. Performed four-wheel alignment. Vehicle tracks straight",
      "Replaced both upper control arm assemblies with Motorcraft units per Ford workshop manual procedure. Torqued mounting bolts to 85 ft-lbs per Ford specification at ride height. Performed four-wheel alignment, camber now adjustable and set to specification. Road tested and confirmed no noise"
    ]
  },
  "Tie Rod Replacement": {
    concerns: [
      "Customer states steering wheel shakes and vehicle wanders on the highway",
      "Customer states clunking noise when turning the steering wheel side to side",
      "Customer states loose feeling in the steering and front tires wearing on outer edge",
      "Customer states popping noise from front end when turning at low speed",
      "Customer states steering has excessive play before wheels respond"
    ],
    conditions: [
      "Found right outer tie rod end has vertical and lateral play exceeding Ford specification during dry park test. Tie rod boot torn and grease contaminated. Tie rod end worn beyond serviceable limit",
      "Found left inner tie rod has 4mm axial play when loaded. Inner tie rod bellows boot leaking steering fluid. Tie rod end ball joint worn per Ford workshop manual inspection procedure",
      "Found both outer tie rod ends have measurable vertical freeplay during loaded articulation test. Tie rod boots cracked and dry. Front toe out of specification due to tie rod end wear",
      "Found right inner tie rod loose at steering rack connection. Tie rod ball socket has excessive play in all directions. Steering rack bellows boot torn and contaminated with road debris",
      "Found left outer tie rod end ball joint worn. Detectable play during dry park inspection at 12 o'clock and 6 o'clock positions. Steering looseness directly attributed to tie rod end wear"
    ],
    corrections: [
      "Replaced right outer tie rod end with Motorcraft MEOE-220 per Ford workshop manual. Transferred alignment mark position from old tie rod. Torqued castle nut to 59 ft-lbs and installed new cotter pin. Performed four-wheel alignment. Road tested, steering tight and responsive",
      "Replaced left inner tie rod end per Ford workshop manual procedure. Replaced steering rack bellows boot and clamps. Set outer tie rod to previous measured length. Torqued jam nut to 59 ft-lbs. Performed four-wheel alignment. No play or leaks detected",
      "Replaced both outer tie rod ends with Motorcraft units. Marked tie rod adjustment position before removal. Installed new castle nuts and cotter pins. Torqued to 59 ft-lbs per Ford specification. Performed four-wheel alignment. Front toe set to specification",
      "Replaced right inner tie rod end per Ford workshop manual. Replaced bellows boot and inner boot clamp. Set tie rod length to match removed assembly measurement. Performed four-wheel alignment. Steering play eliminated, vehicle tracks straight on road test",
      "Replaced left outer tie rod end with Motorcraft part. Installed new castle nut and cotter pin, torqued to Ford specification. Performed four-wheel alignment and set toe to Ford specification center value. Road tested 10 miles, steering feels tight with no play or noise"
    ]
  },

  // ============================================
  // ELECTRICAL
  // ============================================
  "Alternator Replacement": {
    concerns: [
      "Customer states battery warning light is illuminated on the dashboard",
      "Customer states headlights dim at idle and brighten when accelerating",
      "Customer states vehicle battery keeps dying overnight",
      "Customer states electrical accessories flicker and vehicle died while driving",
      "Customer states whining noise from engine that changes with RPM and battery light comes on intermittently"
    ],
    conditions: [
      "Found alternator output voltage at 12.2V at idle, specification is 13.5-14.8V per Ford workshop manual. Battery passed load test. Alternator not charging and requires replacement",
      "Found alternator producing 14.9V at idle increasing to 16.1V at 2000 RPM. Voltage exceeds Ford maximum specification of 14.8V. Voltage regulator failed in alternator assembly causing overcharge condition",
      "Found alternator AC ripple voltage at 1.2V, specification is less than 0.5V per Ford diagnostic procedure. Diode rectifier bridge failed internally. Alternator output drops below 12V under electrical load",
      "Found alternator output fluctuating between 11.8V and 14.5V at steady idle. Alternator bearing has rough feel when rotated by hand. Internal regulator and bearing failure confirmed",
      "Found alternator charging voltage at 12.8V under load, specification is 13.5-14.8V minimum. Performed voltage drop test, B-plus circuit at 0.1V within specification. Alternator internal failure confirmed"
    ],
    corrections: [
      "Replaced alternator with Motorcraft GL-993 per Ford workshop manual procedure. Installed new serpentine belt. Verified charging voltage at 14.4V at idle and 14.2V at 2000 RPM within Ford specification. Battery light off, system operating correctly",
      "Replaced alternator assembly with Motorcraft remanufactured unit per Ford procedure. Torqued mounting bolts to specification. Verified charging output at 14.3V at idle and steady under load. No overcharge condition present. Road tested and confirmed proper operation",
      "Replaced alternator per Ford workshop manual. Inspected serpentine belt and tensioner, belt within wear specification. Verified alternator output at 14.4V. AC ripple voltage now at 0.1V within specification. All electrical accessories operating normally",
      "Replaced alternator assembly with Motorcraft unit. Replaced serpentine belt due to glazing from slipping on failed alternator. Verified charging voltage at 14.3V at idle. Performed parasitic draw test at 28 milliamps within Ford specification. Battery warning light off",
      "Replaced alternator with Motorcraft GL series unit per Ford workshop manual. Cleaned battery cable connections and applied dielectric grease. Verified charging output at 14.4V under full electrical load. No warning lights present. Road tested and system stable"
    ]
  },
  "Starter Motor Replacement": {
    concerns: [
      "Customer states vehicle clicks but will not crank when turning the key",
      "Customer states grinding noise when starting the engine",
      "Customer states intermittent no-crank condition, sometimes starts fine other times nothing happens",
      "Customer states starter turns slowly and engine barely cranks over",
      "Customer states loud whirring noise when turning key but engine does not engage"
    ],
    conditions: [
      "Found starter motor draws 280 amps with no crankshaft rotation. Specification is 130-180 amps under normal cranking load. Starter motor seized internally. Battery tested good at 12.6V and 620 CCA",
      "Found starter motor pinion gear teeth damaged and worn. Flywheel ring gear inspected and has minor wear but is serviceable. Starter drive Bendix not engaging properly causing grinding noise",
      "Found starter motor solenoid intermittently fails to engage. Voltage at starter S terminal is 11.8V during crank command confirming circuit is OK. Starter solenoid contact disc burned and pitted internally",
      "Found starter cranking speed at 82 RPM, Ford minimum specification is 100 RPM. Starter current draw at 245 amps exceeds 180 amp specification. Battery passed load test at 640 CCA. Starter motor brushes worn",
      "Found starter motor Bendix drive freewheeling and not engaging flywheel ring gear. Overrunning clutch in starter drive assembly failed. Starter motor runs but does not rotate engine"
    ],
    corrections: [
      "Replaced starter motor with Motorcraft SA-1002 per Ford workshop manual procedure. Torqued starter mounting bolts to 18 ft-lbs per Ford specification. Verified cranking speed at 220 RPM and current draw at 155 amps within specification. Engine starts and runs correctly",
      "Replaced starter motor assembly with Motorcraft unit per Ford workshop manual. Inspected flywheel ring gear teeth, no replacement needed. Torqued mounting bolts to Ford specification. Verified smooth engagement and no grinding noise during multiple start cycles",
      "Replaced starter motor and solenoid assembly per Ford procedure. Cleaned battery cable connections at starter and ground point. Torqued starter bolts to 18 ft-lbs. Verified reliable starting over 10 consecutive start cycles. No intermittent no-crank condition present",
      "Replaced starter motor with Motorcraft remanufactured unit. Verified battery cable voltage drop at 0.2V within specification during crank. Cranking speed now at 210 RPM and current draw at 148 amps within Ford specification. Engine starts promptly",
      "Replaced starter motor assembly with Motorcraft SA series unit per Ford workshop manual. Starter drive now fully engages ring gear. Torqued all fasteners to specification. Verified proper operation over multiple start cycles. No abnormal noise during cranking"
    ]
  },
  "Check Engine Light Diagnosis": {
    concerns: [
      "Customer states check engine light is on steady and has been on for approximately one week",
      "Customer states check engine light came on and vehicle seems to run differently than normal",
      "Customer states check engine light is flashing while driving and engine is running rough",
      "Customer states check engine light came on after refueling and gas cap appears to be tight",
      "Customer states multiple warning lights illuminated on dash including check engine and traction control"
    ],
    conditions: [
      "Found DTC P0171 stored in PCM for system too lean bank 1, confirmed with fuel trim data showing long term fuel trim at positive 18 percent indicating unmetered air entering intake system per Ford workshop manual Section 303-14",
      "Found DTC P0300 stored for random multiple misfire detected, freeze frame data shows misfire occurring under load at operating temperature, confirmed ignition coil and spark plug degradation on cylinders 2 and 5 per Ford diagnostic procedure",
      "Found DTC P0456 stored for EVAP system small leak detected, performed Ford EVAP smoke test per workshop manual Section 303-13 and found leak at purge valve seal, fuel cap tested and passed",
      "Found DTCs P0301 and P0316 stored for cylinder 1 misfire and misfire detected on startup, confirmed ignition coil pack failure on cylinder 1 with secondary ignition waveform analysis per Ford workshop manual",
      "Found DTCs P2196 and P2198 stored for O2 sensor signal stuck rich on banks 1 and 2, confirmed fuel injectors leaking down causing rich condition at idle, fuel pressure bleed-down test failed per Ford workshop manual Section 303-04"
    ],
    corrections: [
      "Performed intake system smoke test per Ford workshop manual Section 303-14, found cracked intake manifold runner gasket, replaced intake manifold gaskets and verified no vacuum leaks, cleared DTCs and confirmed long term fuel trims returned to within specification",
      "Replaced ignition coil packs and Motorcraft SP-series spark plugs on cylinders 2 and 5 per Ford workshop manual Section 303-07, gapped plugs to specification, cleared DTCs and road tested to confirm no misfires under load",
      "Replaced EVAP canister purge valve with Motorcraft component per Ford workshop manual Section 303-13, verified EVAP system sealed with smoke test confirming no leaks, cleared DTC P0456 and performed drive cycle to verify EVAP monitor passes",
      "Replaced cylinder 1 ignition coil pack with Motorcraft DG-series coil and Motorcraft SP-series spark plug per Ford workshop manual Section 303-07, cleared DTCs P0301 and P0316, road tested and confirmed no misfire on cold start or under load",
      "Replaced fuel injectors on bank 1 and bank 2 with Motorcraft CM-series fuel injectors per Ford workshop manual Section 303-04, performed fuel injector flow balance test to verify within specification, cleared DTCs and verified fuel trims within normal range"
    ]
  },
  "Electrical Diagnostic": {
    concerns: [
      "Customer states vehicle will not start intermittently and dash lights flicker when turning the key",
      "Customer states battery keeps dying overnight even after replacing the battery recently",
      "Customer states multiple electrical accessories have stopped working including power windows and radio",
      "Customer states headlights dim at idle and brighten when accelerating and battery light flickers on dash",
      "Customer states vehicle has intermittent no-crank condition and security light illuminates on dash"
    ],
    conditions: [
      "Found battery cable terminal corroded and loose at positive battery post causing high resistance connection, voltage drop test measured 1.2V across positive cable exceeding Ford specification of 0.5V per workshop manual Section 414-01",
      "Found parasitic battery drain measuring 850mA with key off exceeding Ford specification of 50mA per workshop manual Section 414-01, isolated drain to body control module not entering sleep mode due to faulty driver door latch switch",
      "Found main body harness connector C2280A corroded and pins damaged causing loss of power to multiple accessory circuits, water intrusion evident at A-pillar connector pass-through per Ford workshop manual Section 418-00",
      "Found charging system underperforming, alternator output measured 11.8V at idle under load, Ford specification requires minimum 13.5V per workshop manual Section 414-00, confirmed internal voltage regulator failure",
      "Found passive anti-theft system transceiver ring around ignition cylinder not reading key chip consistently, PATS DTC B1213 stored for anti-theft number of programmed keys is less than minimum, confirmed transceiver resistance out of specification per Ford workshop manual Section 419-01"
    ],
    corrections: [
      "Replaced positive and negative battery cable terminals with Motorcraft battery terminal ends per Ford workshop manual Section 414-01, cleaned battery posts, applied Motorcraft battery terminal protectant, verified voltage drop within specification and confirmed proper starting",
      "Replaced driver door latch assembly with Motorcraft component per Ford workshop manual Section 501-14 to eliminate parasitic drain, verified key-off current draw at 28mA within Ford specification of 50mA per Section 414-01, road tested and confirmed battery maintains charge overnight",
      "Performed wiring harness repair at connector C2280A per Ford workshop manual Section 418-00, replaced corroded pins and sealed connector with dielectric grease, repaired water intrusion point at A-pillar with approved sealer, verified all accessory circuits operational",
      "Replaced alternator with Motorcraft GL-series remanufactured unit per Ford workshop manual Section 414-00, verified charging system output at 14.2V at idle under load within specification, cleared charging system DTCs and confirmed battery light no longer illuminates",
      "Replaced PATS transceiver ring assembly per Ford workshop manual Section 419-01, programmed keys to new transceiver using Ford IDS, verified all programmed keys read consistently, cleared DTC B1213 and confirmed vehicle starts reliably on all key presentations"
    ]
  },

  // ============================================
  // EMISSIONS
  // ============================================
  "Catalytic Converter Replacement": {
    concerns: [
      "Customer states check engine light is on and vehicle has a sulfur or rotten egg smell from exhaust",
      "Customer states vehicle has no power on acceleration and feels like it is restricted",
      "Customer states check engine light has been flashing during highway driving and vehicle is running rough",
      "Customer states vehicle failed emissions inspection and was told catalytic converter is not functioning",
      "Customer states rattling noise from underneath the vehicle that increases with engine RPM"
    ],
    conditions: [
      "Found catalytic converter efficiency below threshold on bank 1, DTC P0420 stored in PCM, confirmed with downstream O2 sensor waveform mirroring upstream sensor indicating catalyst substrate failure",
      "Found catalytic converter internally restricted causing excessive exhaust backpressure, confirmed with backpressure test reading 4.2 PSI at idle exceeding Ford specification of 1.25 PSI per workshop manual Section 309-00",
      "Found catalytic converter substrate broken and loose inside converter housing causing internal rattle, confirmed DTC P0420 stored and catalyst monitor incomplete per Ford workshop manual diagnostic procedure",
      "Found catalytic converter contaminated from chronic engine misfire condition, DTCs P0420 and P0430 stored, downstream O2 sensor switching ratio exceeds specification per Ford diagnostic procedure 309-00",
      "Found catalytic converter heat shield separated and catalyst substrate deteriorated, DTC P0421 stored indicating warm-up catalyst efficiency below threshold per Ford workshop manual Section 309-00"
    ],
    corrections: [
      "Replaced catalytic converter assembly with Ford authorized replacement per workshop manual Section 309-06, cleared DTCs, performed drive cycle to verify catalyst monitor passes and no DTCs return",
      "Replaced catalytic converter and installed new exhaust gaskets per Ford workshop manual Section 309-06, verified exhaust backpressure within specification at 0.8 PSI at idle, cleared DTCs and road tested",
      "Replaced catalytic converter assembly and upstream O2 sensor with Motorcraft DY-series oxygen sensor per Ford workshop manual procedure, cleared DTCs, performed extended road test to confirm catalyst efficiency monitor completes",
      "Replaced both bank 1 and bank 2 catalytic converters with Ford authorized assemblies per workshop manual Section 309-06, installed new Motorcraft O2 sensors, cleared DTCs and verified repair with drive cycle completion",
      "Performed catalytic converter replacement per Ford workshop manual Section 309-06, replaced converter mounting hardware and gaskets, torqued all fasteners to specification, cleared DTCs and confirmed no exhaust leaks"
    ]
  },
  "O2 Sensor Replacement": {
    concerns: [
      "Customer states check engine light is on and vehicle has poor fuel economy compared to normal",
      "Customer states engine runs rough at idle and exhaust has a strong fuel smell",
      "Customer states check engine light illuminated and vehicle hesitates on acceleration from a stop",
      "Customer states vehicle failed emissions testing and was told oxygen sensor is faulty",
      "Customer states check engine light came on after a long highway drive and fuel economy dropped significantly"
    ],
    conditions: [
      "Found upstream heated oxygen sensor bank 1 sensor 1 reading fixed rich with no switching, DTC P0131 stored in PCM, confirmed sensor has failed per Ford workshop manual diagnostic procedure Section 303-14",
      "Found downstream oxygen sensor bank 1 sensor 2 response time exceeds specification, DTC P0137 stored, sensor voltage fixed below 0.1V indicating sensor has failed per Ford diagnostic procedure",
      "Found upstream oxygen sensor bank 2 sensor 1 heater circuit open, DTC P0155 stored in PCM, confirmed heater element resistance out of specification per Ford workshop manual Section 303-14",
      "Found post-catalyst oxygen sensor bank 2 sensor 2 slow response causing false catalyst efficiency code, DTCs P0157 and P0430 stored, confirmed sensor switching rate below threshold per Ford diagnostic procedure",
      "Found pre-catalyst oxygen sensor wiring harness chafed against exhaust manifold heat shield causing intermittent open circuit, DTC P0135 stored for HO2S heater circuit malfunction per Ford workshop manual"
    ],
    corrections: [
      "Replaced upstream heated oxygen sensor bank 1 sensor 1 with Motorcraft DY-series HO2S sensor per Ford workshop manual Section 303-14, applied anti-seize to threads, torqued to specification, cleared DTCs and verified sensor switching within parameters",
      "Replaced downstream oxygen sensor bank 1 sensor 2 with Motorcraft DY-series sensor per Ford workshop manual procedure, cleared DTCs and performed drive cycle to confirm catalyst efficiency monitor passes",
      "Replaced upstream heated oxygen sensor bank 2 sensor 1 with Motorcraft DY-series sensor, verified heater circuit resistance within specification of 2-30 ohms per Ford workshop manual Section 303-14, cleared DTCs and road tested",
      "Replaced post-catalyst oxygen sensor bank 2 sensor 2 with Motorcraft DY-series sensor per Ford workshop manual procedure, cleared DTCs P0157 and P0430, performed extended drive cycle to verify catalyst monitor completes within threshold",
      "Performed O2 sensor wiring harness repair per Ford workshop manual Section 303-14, replaced upstream oxygen sensor with Motorcraft DY-series sensor, rerouted harness away from exhaust heat shield and secured with OEM retaining clips, cleared DTCs and verified repair"
    ]
  },
  "EGR Valve Service": {
    concerns: [
      "Customer states engine runs rough at idle and check engine light is on",
      "Customer states vehicle surges and hesitates at low speeds especially in stop and go traffic",
      "Customer states engine stalls at idle after coming to a stop and check engine light is illuminated",
      "Customer states knocking or pinging noise from engine under light acceleration with check engine light on",
      "Customer states poor fuel economy and a rough idle that has gotten progressively worse over time"
    ],
    conditions: [
      "Found EGR valve stuck open causing rough idle condition, DTC P0401 stored in PCM for EGR flow insufficient, confirmed EGR valve diaphragm not seating properly per Ford workshop manual Section 303-08",
      "Found EGR valve and intake port passages heavily restricted with carbon deposits, EGR flow test shows insufficient flow rate, DTC P0401 stored per Ford workshop manual diagnostic procedure",
      "Found EGR valve stuck closed due to excessive carbon buildup on pintle, DTC P0402 stored for EGR flow excessive, DPFE sensor reading out of range per Ford workshop manual Section 303-08",
      "Found DPFE sensor hoses deteriorated and cracked causing erratic EGR operation, DTC P0405 stored for EGR position sensor circuit low, confirmed per Ford TSB and workshop manual Section 303-08",
      "Found EGR valve electrically inoperative, commanded EGR position does not match actual position on scan tool, DTC P0403 stored for EGR circuit malfunction per Ford workshop manual diagnostic procedure"
    ],
    corrections: [
      "Replaced EGR valve with Motorcraft EGR valve assembly per Ford workshop manual Section 303-08, cleaned EGR intake passages of carbon deposits, installed new EGR gasket, cleared DTCs and verified EGR operation with scan tool",
      "Performed EGR system carbon cleaning service per Ford workshop manual Section 303-08, cleaned EGR valve pintle and seat, cleaned EGR intake port passages, reinstalled and verified proper EGR flow rate within specification",
      "Replaced EGR valve and DPFE sensor with Motorcraft components per Ford workshop manual Section 303-08, replaced deteriorated DPFE sensor hoses, cleared DTCs and verified EGR commanded vs actual position within specification on scan tool",
      "Replaced EGR valve assembly with Motorcraft component per Ford workshop manual procedure, cleaned intake manifold EGR passages, installed new gaskets and torqued to specification, cleared DTCs and road tested to verify no surge or hesitation",
      "Performed EGR valve replacement and intake manifold carbon cleaning service per Ford workshop manual Section 303-08, replaced EGR valve gasket and mounting hardware, verified EGR system operation across RPM range with scan tool, cleared DTCs and confirmed repair"
    ]
  },

  // ============================================
  // ECOBOOST
  // ============================================
  "EcoBoost Turbo Service": {
    concerns: [
      "Customer states lack of power on acceleration and a whining noise from the engine compartment",
      "Customer states check engine light is on and vehicle goes into reduced power mode during hard acceleration",
      "Customer states oil consumption has increased and blue smoke is visible from exhaust on acceleration",
      "Customer states whistling noise from engine bay that changes pitch with RPM and boost feels inconsistent",
      "Customer states engine surges under boost and check engine light flashes intermittently during highway driving"
    ],
    conditions: [
      "Found turbocharger wastegate actuator rod seized and not regulating boost pressure, DTC P0299 stored for underboost condition, confirmed turbo boost pressure below specification per Ford workshop manual Section 303-04D EcoBoost",
      "Found turbocharger compressor wheel housing scored and compressor wheel contacting housing, excessive shaft play measured beyond specification, DTC P0299 stored per Ford workshop manual EcoBoost turbocharger inspection procedure",
      "Found turbocharger oil seal leaking on turbine side causing oil consumption and blue exhaust smoke, confirmed turbo shaft axial and radial play exceeds specification per Ford workshop manual Section 303-04D",
      "Found charge air cooler intercooler pipe clamp loose causing boost leak, confirmed with smoke test showing leak at intercooler outlet connection, DTC P0299 stored for turbo underboost per Ford workshop manual",
      "Found turbocharger wastegate actuator solenoid valve inoperative, DTC P0234 stored for overboost condition, turbo boost pressure exceeding specification causing PCM to enter reduced power mode per Ford workshop manual Section 303-04D"
    ],
    corrections: [
      "Replaced turbocharger assembly with Motorcraft remanufactured turbocharger per Ford workshop manual Section 303-04D, replaced turbo oil supply and return lines, primed turbo with Motorcraft SAE 5W-30 per WSS-M2C946-B1 before startup, cleared DTCs and verified boost within specification",
      "Replaced turbocharger wastegate actuator assembly per Ford workshop manual Section 303-04D, calibrated wastegate position with Ford IDS scan tool, verified boost pressure regulation within specification across RPM range, cleared DTCs and road tested",
      "Performed turbocharger replacement per Ford workshop manual Section 303-04D EcoBoost procedure, replaced turbo oil feed line and gaskets, filled with Motorcraft SAE 5W-30 per WSS-M2C946-B1, pre-lubricated turbo bearing, cleared DTCs and performed extended road test to verify repair",
      "Replaced charge air cooler pipe and clamp assembly per Ford workshop manual procedure, performed boost leak smoke test to confirm no additional leaks in intercooler system, cleared DTC P0299 and verified boost pressure within specification under load",
      "Replaced turbocharger wastegate solenoid valve with Motorcraft component per Ford workshop manual Section 303-04D, verified wastegate actuator operation and boost regulation within specification using Ford IDS, cleared DTCs and performed extended road test under varying load conditions"
    ]
  },
  "Timing Chain Service": {
    concerns: [
      "Customer states engine makes a rattling noise on cold start that diminishes after warm-up",
      "Customer states check engine light is on and vehicle has reduced power on acceleration",
      "Customer states engine sounds like a diesel at idle and noise gets louder over time",
      "Customer states vehicle stalled while driving and engine warning light illuminated on dash",
      "Customer states rough idle and intermittent misfires especially in cold weather conditions"
    ],
    conditions: [
      "Found timing chain stretched beyond specification per Ford workshop manual Section 303-01B, DTC P0016 stored in PCM",
      "Found timing chain tensioner collapsed and no longer maintaining proper chain tension, chain guides cracked and missing material per inspection procedure",
      "Found timing chain has excessive slack causing camshaft to crankshaft correlation fault, DTCs P0017 and P0018 stored, confirmed with camshaft position sensor waveform analysis",
      "Found primary timing chain guide broken with debris in lower timing cover, chain jumped one tooth on exhaust camshaft sprocket per Ford TSB 19-2346",
      "Found variable camshaft timing phaser rattle on bank 1 due to worn timing chain allowing insufficient oil pressure to phaser, confirmed per Ford workshop manual procedure 303-01B"
    ],
    corrections: [
      "Replaced timing chain, tensioner, and guides with Motorcraft TK-series timing chain kit per Ford workshop manual Section 303-01B, reset camshaft timing to specification and cleared DTCs",
      "Replaced timing chain tensioner assembly and both timing chain guides with Motorcraft components, verified chain tension within specification and performed engine timing verification",
      "Performed timing chain and VCT phaser replacement per Ford workshop manual procedure 303-01B, installed new Motorcraft chain tensioner and guides, verified cam-to-crank correlation within specification",
      "Replaced complete timing chain assembly including chain, tensioner, and upper and lower guides, cleaned debris from timing cover and oil pan, refilled with Motorcraft SAE 5W-30 per WSS-M2C946-B1, cleared DTCs and verified repair",
      "Performed timing chain system overhaul replacing chain, tensioner, guides, and VCT phaser solenoids with Motorcraft components per Ford workshop manual Section 303-01B, performed relearn procedure and road tested to confirm repair"
    ]
  }
};
