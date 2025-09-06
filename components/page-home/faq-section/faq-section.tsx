import React from "react";
import { Accordion, Heading, Link, VStack, Box } from "@chakra-ui/react";
import {
  AccordionItem,
  Props as QuestionProps,
} from "components/common/accordion/accordion-item";
import { Label } from "components/common/inputs/label";

const QUESTION_LIST: QuestionProps[] = [
  {
    question: <>Why do I need to swap old xcRMRK to new RMRK tokens?</>,
    answer: (
      <>
        The Multichain bridge, once used for token bridging, is now suspended
        due to identified issues by the Multichain team. This has resulted in
        the xcRMRK token being fragmented across multiple chains, leaving it
        without a means of bridging between them and beyond the control of RMRK
        teams. The new RMRK token is a cross-chain token that can be bridged
        between chains through Axelar Network, providing resistance to such
        events in the future.
      </>
    ),
  },
  {
    question: <>How safe is it to swap the old tokens to the new ones?</>,
    answer: (
      <>
        Our team made sure to develop something secure. For that, the contract
        of the new token is based on OZ and Axelar meaning that their audits are
        inherited. So it’s completely safe to swap your old tokens to the new
        ones.
      </>
    ),
  },

  {
    question: <>How do I swap old xcRMRK to new RMRK tokens?</>,
    answer: (
      <>
        <Box
          as={"iframe"}
          w={"100%"}
          src="https://www.youtube.com/embed/nIhgptWBURI?si=5JUhbxo-X6H17fMs"
          title={"Swap xcRMRK to new RMRK"}
          frameBorder={"0"}
          allow={
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          }
          allowFullScreen
          aspectRatio={16 / 9}
        />
      </>
    ),
  },
  {
    question: <>How do I bridge RMRK token between chains?</>,
    answer: (
      <>
        <Box
          as={"iframe"}
          w={"100%"}
          aspectRatio={16 / 9}
          src="https://www.youtube.com/embed/5eIi9AJb1kY?si=aqj3pf96EzQuXbAU"
          title={"RMRK cross-chain transfers "}
          frameBorder={"0"}
          allow={
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          }
          allowFullScreen
        />
      </>
    ),
  },
  {
    question: <>How do I add the new RMRK token to my wallet?</>,
    answer: (
      <>
        <VStack align={"stretch"} gap={10}>
          <VStack gap={2} align={"stretch"}>
            <Label>
              For Metamask and for general knowledge check the following video:
            </Label>
            <Box
              as={"iframe"}
              w={"100%"}
              aspectRatio={16 / 9}
              src="https://www.youtube.com/embed/RnWTtyzJ7NQ?si=5Rd7gUrB2QdwQJ33"
              title={"RMRK cross-chain transfers "}
              frameBorder={"0"}
              allow={
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              }
              allowFullScreen
            />
          </VStack>
          <VStack gap={2} align={"stretch"}>
            <Label>Other wallets:</Label>
            <Box>
              Talisman{" "}
              <Link
                href={
                  "https://docs.talisman.xyz/talisman/navigating-the-paraverse/ethereum-features/adding-custom-tokens"
                }
                isExternal
                color={"pink.500"}
              >
                docs
              </Link>
            </Box>
            <Box>
              Nova Wallet{" "}
              <Link
                href={
                  " https://docs.novawallet.io/nova-wallet-wiki/asset-management/add-custom-erc-20-token"
                }
                isExternal
                color={"pink.500"}
              >
                docs
              </Link>
            </Box>
            <Box color={"red.400"} pt={2}>
              Remember to stay safe. Nobody from the team will ever sent you a
              DM first neither ask your private keys
            </Box>
          </VStack>
        </VStack>
      </>
    ),
  },
  {
    question: <>My xcRMRK is on CEX, do I need to do anything?</>,
    answer: (
      <>
        We are discussing with CEXes if they can migrate all tokens
        automatically but there is no guarantee that it will happen. If you have
        your tokens on a CEX and want to upgrade them to the new RMRK token, you
        will need to withdraw them to your personal wallet and then swap them to
        the new RMRK token.
      </>
    ),
  },
  {
    question: <>Can I swap the new token back to old xcRMRK?</>,
    answer: (
      <>No, the swap one way and old xcRMRK tokens get burned in the process.</>
    ),
  },
  {
    question: <>Where can I trade the new RMRK token?</>,
    answer: (
      <>
        At the moment you can trade the new RMRK token on{" "}
        <Link
          isExternal
          color={"pink.500"}
          href={
            "https://app.uniswap.org/tokens/base/0x524d524b4c9366be706d3a90dcf70076ca037ae3"
          }
        >
          Uniswap on Base
        </Link>{" "}
        and{" "}
        <Link
          isExternal
          color={"pink.500"}
          href={"https://app.stellaswap.com/pulsar?tab=community-pools"}
        >
          StellaSwap on Moonbeam
        </Link>
        . We are working on getting it listed on other exchanges.
      </>
    ),
  },
  {
    question: (
      <>
        Can we keep holding tokens on AssetHub, bridge them to Moonriver, and
        then trade on Kucoin?
      </>
    ),
    answer: (
      <>
        Yes, you can store your tokens on AssetHub, but they won't be usable on
        any RMRK dApps. We recommend migrating them to the new RMRK token and
        using Uniswap or StellaSwap for trading.
      </>
    ),
  },
  {
    question: (
      <>
        What will happen with tokens that will not migrate? Will they get
        burned?
      </>
    ),
    answer: (
      <>
        No, they will not get burned. xcRMRK will remain on the chain they're on
        without any utility. Users can migrate them at any time.
      </>
    ),
  },
  {
    question: <>What chains is the new RMRK token available on?</>,
    answer: (
      <>
        The new RMRK token is currently available on Ethereum, Polygon, Base,
        BSC and Moonbeam. Any other chain that becomes a part of RMRK ecosystem
        will also have the new RMRK token available.
        <br />
        <br />
        <Box fontWeight={"bold"} mb={1}>
          The new RMRK token addresses are:
        </Box>
        <VStack as={"ul"} gap={1} align={"stretch"}>
          <Box as={"li"}>
            Ethereum:{" "}
            <Link
              href={
                "https://etherscan.io/address/0x524d524B4c9366be706D3A90dcf70076ca037aE3"
              }
              isExternal
            >
              0x524d524B4c9366be706D3A90dcf70076ca037aE3
            </Link>
          </Box>
          <Box as={"li"}>
            Polygon:{" "}
            <Link
              href={
                "https://polygonscan.com/address/0x524d524B4c9366be706D3A90dcf70076ca037aE3"
              }
              isExternal
            >
              0x524d524B4c9366be706D3A90dcf70076ca037aE3
            </Link>
          </Box>
          <Box as={"li"}>
            Base:{" "}
            <Link
              href={
                "https://basescan.org/address/0x524d524B4c9366be706D3A90dcf70076ca037aE3"
              }
              isExternal
            >
              0x524d524B4c9366be706D3A90dcf70076ca037aE3
            </Link>
          </Box>
          <Box as={"li"}>
            BSC:{" "}
            <Link
              href={
                "https://bscscan.com/address/0x524d524B4c9366be706D3A90dcf70076ca037aE3"
              }
              isExternal
            >
              0x524d524B4c9366be706D3A90dcf70076ca037aE3
            </Link>
          </Box>
          <Box as={"li"}>
            Moonbeam:{" "}
            <Link
              href={
                "https://moonbeam.moonscan.io/address/0x524d524B4c9366be706D3A90dcf70076ca037aE3"
              }
              isExternal
            >
              0x524d524B4c9366be706D3A90dcf70076ca037aE3
            </Link>
          </Box>
        </VStack>
      </>
    ),
  },
];

export const FaqSection = () => (
  <VStack data-name={"faq-section"} gap={10}>
    <Heading as={"h2"} fontSize={"3xl"} lineHeight={9}>
      Migration FAQ
    </Heading>
    <Accordion allowToggle w={"100%"}>
      <VStack spacing={4} alignItems={"stretch"}>
        {QUESTION_LIST.map((item) => (
          <AccordionItem
            question={item.question}
            answer={item.answer}
            key={`question-${JSON.stringify(item.question)}`}
          />
        ))}
      </VStack>
    </Accordion>
  </VStack>
);
